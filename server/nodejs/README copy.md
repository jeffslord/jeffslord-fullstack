# Dow Graph Project

- [Dow Graph Project](#dow-graph-project)
  - [Steps required by DOW](#steps-required-by-dow)
    - [Connect XSA Graph Application to Correct Data Source](#connect-xsa-graph-application-to-correct-data-source)
      - [Steps](#steps)
  - [Features Yet To Be Implemented](#features-yet-to-be-implemented)
    - [Plant Substitution Table](#plant-substitution-table)

## Steps required by DOW

### Connect XSA Graph Application to Correct Data Source

It is required to create a user provided service in order to connect a classic non XSA created schema (such as an SLT schema) to an XSA created schema (like the container schema created by this graph application). Once this connection is made, the calculation views can be pointed to production data.

Due to DOW XSA system not being set up at the time of development, a few steps must be completed in order to connect the application to the correct data source.

#### Steps

1. Create a HANA database user that has access to the non XSA schemas required by the graph application.
2. Create a User Provided Service

- Create UPS in XSA Cockpit with format as follows:

```json
{
"schema": "<SCHEMA_NAME>",
"password": "<PASS>",
"driver": "com.sap.db.jdbc.Driver",
"port": "<PORT (usually 30015)>",
"host": "<HOST>",
"user": "<USER>",
"tags": "hana"
}
```

3. Edit the file in `db/src/grants/ups.hdbgrants.txt`

- Remove `.txt`
- Replace `<UPS>` with the name of the User Provided Service
- Replace `<UPS_SCEHMA>` with the name of the schema reference
- A final version would look similiar to the following example:

```json
{
    "SFLIGHT": {
        "object_owner": {
            "schema_privileges": [{
                "reference": "SFLIGHT",
                "privileges_with_grant_option": ["SELECT", "SELECT METADATA", "EXECUTE"]
            }]
        },
        "application_user": {
            "schema_privileges": [{
                "reference": "SFLIGHT",
                "privileges_with_grant_option": ["SELECT", "SELECT METADATA", "EXECUTE"]
            }]
        }
    }
}
```

1. Edit the file in `db/src/synonyms/syn.hdbsynonym.txt`

- Remove `.txt`
- `Right Click > 'Open Synonym Editor'`
- Select the second button at the top `Mass Import of Synonyms`
- In the External Service dropdown, select your UPS.
- In the schema list, select the schema where your data is being replicated to.
- Click `Ok`
- If you open up the synonym file in text editor, it should look something like the following, replaced with DOW tables:

```json
{
  "SAIRPORT": {
    "target": {
      "object": "SAIRPORT",
      "schema": "SFLIGHT"
    }
  },
  "SBOOK": {
    "target": {
      "object": "SBOOK",
      "schema": "SFLIGHT"
    }
  },
  "SCARR": {
    "target": {
      "object": "SCARR",
      "schema": "SFLIGHT"
    }
  },
  "SCUSTOM": {
    "target": {
      "object": "SCUSTOM",
      "schema": "SFLIGHT"
    }
  }
}
```

1. Open the file in `db/src/calculation views/cv_in_scope.hdbcalculationview`
- Right click on the bottom most datasource `GRAPH.TRANSACTIONS` and select `Replace With Data Source`
- Search for and select the transaction table from the UPS

6. Replace all of the references to `GRAPH.TRANSACTIONS` in the following:
- `db/src/calculation views/cv_vertices.hdbcalculationview`
- `db/src/calculation views/cv_edges.hdbcalculationview`

7. Build the database module by right clicking on `db > Build > Build`
8. If build completes successfully, everything was edited correctly. If there are build errors, check the error and review effected files.

## Features Yet To Be Implemented

### Plant Substitution Table

No table/view has been provided to reference to check for plant substitutions. This feature can be implemented when this table/view becomes avialable.