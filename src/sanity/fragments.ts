// as of now iterating over languanges is not compatible with Sanity TypeGen
//TODO: add Italian
export const expandLinks = `
de[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "slug": @.reference->number,
      "type": @.reference->_type,
    }
  }
},
fr[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "slug": @.reference->number,
      "type": @.reference->_type,
    }
  }
}
`
