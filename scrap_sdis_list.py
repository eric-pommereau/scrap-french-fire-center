#!/usr/bin/python2.7
#-*- coding: utf-8 -*-

# Créer un fichier : sdis-list.csv contentant les liens vers chaque page de departement
# Mettre le tout dans un fichier

from urllib2 import urlopen
import bs4 as BeautifulSoup
import csv
import re

file_output = './generated_files/sdis-list.csv'
page = 'https://www.pompiercenter.com/annuaire-sdis.php'

html = urlopen(page).read()

soup = BeautifulSoup.BeautifulSoup(html, 'html.parser')

aPageElements = soup.find_all("a",{ "href" : re.compile("/annuaire-sdis/sdis-\d{1,3}.htm")})

csv_file = open(file_output, 'w')
sdis_list_writer = csv.writer(csv_file, delimiter=';')
sdis_list_writer.writerow(['num_dept', 'nom_dept', 'href'])

try :
    for element in aPageElements:
        href = element['href']
        aDept = element.text.lstrip().rstrip(" \n").split(" - ")
        num_dept = aDept[0]
        nom_dept = aDept[1]

        print num_dept, nom_dept, href
        sdis_list_writer.writerow([num_dept.encode('utf8'), nom_dept.encode('utf8'), href])
finally:
    csv_file.close()