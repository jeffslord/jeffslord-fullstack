# DOCUMENTATION


## Current features

### Idenitfy
  - Split nodes
  - Right joins
  - Unused input parameters
  - Calculated columns in filters
  - Hints

### Fix
- Split Nodes
- Right Joins

## Planned features
  - Identify calculated columns in joins
  - Select classic schema to auto analyze cdata from a schema
  - Upload zip of xsa calculation views to analyze from

## Limitations
- ~~Currently this works for classic version of calculation views.~~
- ~~Quick check is to see if input nodes use '#' at the beginning. If they do, this will work.~~
- Logical nodes are not processed currently (things like graph nodes)

## Notes
- HANA Studio appears to end at version 2.3, while Web Ide is at version 3.0.