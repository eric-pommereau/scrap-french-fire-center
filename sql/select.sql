-- Extraire le premier mot de la colonne center (CIS, CS, CPI, CENTRE...)

with centre as (
	select centre, regexp_matches(centre, '^(\w{1,8})') as type from sdis_center
)

select type[1], count(centre) as ctr from centre group BY type
order by ctr DESC

-- Sélectionner avec une regexp
select * from "sdis-centers-by-dept_modif" where centre ~ '^JOFFRE'

-- Sélectionner les lat lon sans geom (affectation manuelle des coordonnées)
