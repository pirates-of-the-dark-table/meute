var addressBook = {
  'mailto:michiel@unhosted.org': {
    rel: 'work',
    sameAs: ['irc:michielbdejong@freenode.net'],
    attr: {
      firstName: 'Michiel',
      lastName: 'de Jong'
    }
  },
  'irc:michiel@unhosted.org': {
    sameAs: ['mailto:michiel@unhosted.org']
  }
};
var firstNameIndex = {
  'Michiel': ['mailto:michiel@unhosted.org']
};
var lastNameIndex = {
  'de Jong': ['mailto:michiel@unhosted.org']
};
