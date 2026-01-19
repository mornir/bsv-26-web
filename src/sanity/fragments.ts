// As of now, iterating over languages is not compatible with Sanity TypeGen.
import { defineQuery } from 'groq'

export const expandLinks = defineQuery(`
de[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "number": @.reference->number,
      "type": @.reference->_type,
    }
  }
},
fr[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "number": @.reference->number,
      "type": @.reference->_type,
    }
  }
}
`)

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
