// As of now, iterating over languages is not compatible with Sanity TypeGen.
import { defineQuery } from 'groq'

/*
Inside markDefs = marks
Inside children = annotation
Top level = custom block
*/

export const parsePortableText = defineQuery(`
de[]{
  ...,
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

// TODO: merge with above
export const expandTables = defineQuery(`
de[]{
  ...,
  children[]{
    ...,
    _type == "table" => {
      "html": @->html.de
    }
  }
},
fr[]{
  ...,
  children[]{
    ...,
    _type == "table" => {
      "html": @->html.fr
    }
  }
}
`)
