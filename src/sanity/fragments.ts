// As of 18-03-2026, iterating over languages is not compatible with Sanity TypeGen.
import { defineQuery } from 'groq'

/*
Inside markDefs = marks
Inside children = annotation
Top level = custom block
*/

export const parsePortableText = defineQuery(`
de[]{
  ...,
    children[]{
    ...,
    _type == "table" => {
      "tableType": @->_type,
      "html": @->html.de,
      "tableId": @->tableId,
      "name": @->name.de,
      "source": @->source,
      "desc": @->description.de,
      "possibleRequirements": @->possibleRequirements[].name.de,
      "rows": @->rows[] {
         ...,
        "system": system->name.de,
      }
    },
  },
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "number": @.reference->number,
      "type": @.reference->_type,
    },
    _type == "figure" => {
      "number": @->number,
      "name": @->name.de,
      "img":  @->image.de,
    },
  }
},
fr[]{
  ...,
    children[]{
    ...,
    _type == "table" => {
      "html": @->html.fr
    }
  },
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "number": @.reference->number,
      "type": @.reference->_type,
    },
    _type == "figure" => {
       "number": @->number,
       "name": @->name.fr,
        "img":  @->image.fr,
        
    },
  }
}
`)

export const articleProjection = defineQuery(`
  { ..., law {${parsePortableText}}, exp {${parsePortableText}}, title->, chapter->, section->}
  `)
