#!/usr/bin/python2.7
#-*- coding: utf-8 -*-

from urllib2 import urlopen
import bs4 as BeautifulSoup
import csv
import re

# page = 'http://localhost:8000/SDIS91.html'
urlbase = 'https://www.pompiercenter.com'
urlsuffixe = '-groupement-territoriaux.htm'
file_output = './generated_files/sdis-list.csv'

try:

    csv_file_list_centers = open('sdis-centers-by-dept.csv', 'w')
    sdis_list_centers_writer = csv.writer(csv_file_list_centers, delimiter=';')

    with open(file_output) as csvfile:

        csvreader = csv.reader(csvfile, delimiter=';')
        csvreader.next()

        for row in csvreader:
            num_depart = row[0]
            nom_depart = row[1]

            # l'url pointe vers la page du sdis --> https://www.pompiercenter.com/annuaire-sdis/sdis-1.htm
            # remplacer pour pointer la page des groupements-territoriaux --> ../sdis-1-groupement-territoriaux.htm
            link = row[2].replace('.htm', urlsuffixe)

            htmlpage = urlbase+link
            # htmlpage = 'https://www.pompiercenter.com/annuaire-sdis/sdis-21-groupement-territoriaux.htm'

            print "-- Crawl de %s" % (htmlpage)

            html = urlopen(htmlpage).read()

            soup = BeautifulSoup.BeautifulSoup(html, 'html.parser')
            # Tous les noeuds dont le lien comporte un name avec groupement_...

            aPageElements = soup.find_all("a",{ "name" : re.compile("groupement_\d{1,5}")})

            for element in aPageElements:

                # Récupérer le noeud suivant (mais pas enfant)
                # soit un groupement, soit un centre de secours
                grp_centre_secours = element.find_next_sibling()

                # trouver le prochain paragraphe (adresse) : <p>Adresse :</p>
                node_addr = grp_centre_secours.find_next_sibling().find('p')

                text_addr = None

                # print addr
                if node_addr != None :
                    text_addr = " ".join(node_addr.next_sibling.lstrip().rstrip(" \n").split(" - "))
                else:
                    groupement = grp_centre_secours.text

                if text_addr == None:
                     print "Groupement : %s" % (grp_centre_secours.text)
                else:
                    print ("%s  %s - %s") %  (groupement, grp_centre_secours.text, text_addr)
                    try :
                        sdis_list_centers_writer.writerow([num_depart.encode('utf-8'), nom_depart.encode('utf-8'), groupement.encode('utf-8'),
                                                       grp_centre_secours.text.encode('utf-8'), text_addr.encode('utf-8')])
                    except csv.Error as e:
                        print "----> ERREUR ----> %s" % e.message
                    except UnicodeDecodeError as e:
                        # Caractères spéciaux dans le nom du département qu'il ne faut pas réencoder en utf-8...
                        sdis_list_centers_writer.writerow([num_depart.encode('utf-8'), nom_depart, groupement.encode('utf-8'),
                             grp_centre_secours.text.encode('utf-8'), text_addr.encode('utf-8')])

                print "###################################################################"
                #print element.find_next_sibling().find_next_sibling()

            #exit()

finally:
    csvfile.close()
    csv_file_list_centers.close()


