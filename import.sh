# Nom de la base
BASE=test

# Collections
COLLECTIONS=(specialites presentation composition avis_SMR_de_la_HAS avis_ASMR_de_la_HAS avis_CT_de_la_HAS groupes_generiques condition_prescription_et_delivrance infos_importantes)

# Colonnes des tables (séparées par des virgules)
TABLE1=codeCis,denomination,formePharmaceutique,voiesAdministration,statutAdministratif,typeProcedureAMM,etatDeCommercialisation,dateAMM,statutBdm,numeroAutorisationEuropeenne,titulaire,surveillanceRenforcee
TABLE2=codeCis,codeCip7,libelle,statusAdmninistratif,etatCommercialisation,dateDeclaration,codeCIP13,agrementCollectivites,tauxRemboursement,prix,indications
TABLE3=codeCis,designationElementPharmaceutique,codeSubstance,denominationSubstance,dosageSubstance,referenceDosage,natureComposant,lienEntreSubstancesActivesEtFractionsTherapeutiques 
TABLE4=codeCis,codeDossierHAS,motifEvaluation,dateAvisCommissionTransparence,valeurSMR,libelleSMR
TABLE5=codeCis,codeDossierHAS,MotifEvaluation,dateAvisCommissionTransparence,valeurASMR,libelleASMR
TABLE6=CodeDossierHAS,lienVersPagesAvis
TABLE7=iDGroupeGenerique,libelleGroupeGenerique,codeCis,typeGenerique,numeroTrisElementsGroupe
TABLE8=codeCis,conditionPrescriptionOuDelivrance 
TABLE9=codeCis,dateDebutInformationSecurite,dateFinInformationSecurite,texteAAfficherEtLienInfoSecurite 

# Noms des fichiers
FICHIERS="CIS_bdpm.txt CIS_CIP_bdpm.txt CIS_COMPO_bdpm.txt CIS_HAS_SMR_bdpm.txt CIS_HAS_ASMR_bdpm.txt HAS_LiensPageCT_bdpm.txt CIS_GENER_bdpm.txt CIS_CPD_bdpm.txt CIS_InfoImportantes.txt"

# Site source
URL=http://base-donnees-publique.medicaments.gouv.fr
PHP=telechargement.php?fichier=


read -p "Voulez-vous mettre à jour les fichiers sources depuis $URL [n/O] ? " a
if [ "$a" = "O" ]; then
    echo -e "\nTéléchargement des fichiers distants :"
else
    echo -e "\nRecherche de fichier(s) manquants(s) à re-télécharger..."
fi

# Acquisition/contrôle des fichiers sources
for FICHIER in $FICHIERS; do
    if [ ! -e $FICHIER ] || [ "$a" = "O" ]; then
        echo ---$URL/$PHP$FICHIER
        wget -v -N $URL/$PHP$FICHIER -O temp$FICHIER                    # Téléchargement des fichiers distant
        iconv -cf "windows-1254" -t "UTF-8" temp$FICHIER -o $FICHIER    # Conversion de l'encodage
    fi
done

# Suppression des fichiers téléchargés non encodés en UTF-8
rm temp*.txt

# Importation dans la base de données
echo -e "\nImportation dans la base de données des fichiers locaux :"
FICHIERS=($FICHIERS)
mongoimport --db $BASE --collection ${COLLECTIONS[0]} --type tsv --file ${FICHIERS[0]} --fields $TABLE1
mongoimport --db $BASE --collection ${COLLECTIONS[1]} --type tsv --file ${FICHIERS[1]} --fields $TABLE2
mongoimport --db $BASE --collection ${COLLECTIONS[2]} --type tsv --file ${FICHIERS[2]} --fields $TABLE3
mongoimport --db $BASE --collection ${COLLECTIONS[3]} --type tsv --file ${FICHIERS[3]} --fields $TABLE4
mongoimport --db $BASE --collection ${COLLECTIONS[4]} --type tsv --file ${FICHIERS[4]} --fields $TABLE5
mongoimport --db $BASE --collection ${COLLECTIONS[5]} --type tsv --file ${FICHIERS[5]} --fields $TABLE6
mongoimport --db $BASE --collection ${COLLECTIONS[6]} --type tsv --file ${FICHIERS[6]} --fields $TABLE7
mongoimport --db $BASE --collection ${COLLECTIONS[7]} --type tsv --file ${FICHIERS[7]} --fields $TABLE8
mongoimport --db $BASE --collection ${COLLECTIONS[8]} --type tsv --file ${FICHIERS[8]} --fields $TABLE9

echo -e "\nFin."
exit 0