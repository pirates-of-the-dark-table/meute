var addressBook = {
  0: {
    mailto: {
      work: 'michiel@unhosted.org'
    },
    irc: {
      0: 'irc:michielbdejong@freenode.net'
    },
    attr: {
      firstName: 'Michiel',
      lastName: 'de Jong'
    }
  }
};

var mailtoIndex = {
  'michiel@unhosted.org': [0]
};
var ircIndex = {
  'michielbdejong': [0]
};
var firstNameIndex = {
  'Michiel': [0]
};
var lastNameIndex = {
  'de Jong': [0]
};

{
  "SOME_ID": {
    firstName: "Martin",
    lastName: "Stadler",
    nickName: "xMartin",
    mailto: [
      {
        address: "martin@siarp.de",
        type: "private"
      },
      {
        address: "martin.stadler@siarp.de",
        type: "work"
      }
    ],
    irc: [
      {
        address: "xMartin@freenode.net",
        type: "unhosted"
      },
      {
        address: "Standart@freenode.net",
        type: "Plone"
      }
    ],
    phone: [
      {
        number: "+4930-111111",
        type: "home"
      },
      {
        number: "+401781974272",
        type: "mobile"
      }
    ]
  }
}
