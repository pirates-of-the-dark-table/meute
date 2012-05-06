define(['javascripts/scripts/vcard.js'], function(){
  //contacts can be of type mailto:, tel:, facebook:, skype:, twitter:, google:, linkedin:, tuenti:
  //they have a field sameAs which is used to glue them together. so we don't create a new namespace 'to bind them all'
  //and we don't create a bag of objects. it's naturally indexed as contacts, by type+id.
  //there is also a field rel, which is a list of tags defining the relation of the contact method to the person, e.g. 'cell', 'home', 'preferred'.
  //and then there's a field attr, which allows us to add attributes to any contact. these are purely informational, and can contradict attributes
  //in glued contacts. for instance, my birthday in skype might contradict my birthday in Google Plus, in which case that's then just the info we have.
  //so examples describing me:
  //localStorage['contacts$mailto:michiel@unhosted.org']= JSON.stringify({
  //  sameAs: ['facebook:604632022', 'dejong.michiel@gmail.com', 'twitter:michielbdejong'],
  //  attr: {
  //    'fn': 'Michiel de Jong'
  //  },
  //  rel: ['preferred', 'work']
  //};:wq
  var vcards={}, emailIndex={}, nameIndex={};

  function parseAndStore(vcardsStr) {
    var parts = vcardsStr.split('BEGIN:VCARD');
    for(var i =0; i<parts.length;i++) {
      if(parts[i].indexOf('END:VCARD') != -1) {
        parseAndStoreOne('BEGIN:VCARD'+parts[i]);
      }
    }
  }
  function genUuid() {
    return new Date().getTime();
  }
  function parseAndStoreOne(vcardStr) {
    var vcardObj = vCard.initialize(vcardStr);
    var uuid=genUuid();
    vcards[uuid]=vcardObj;
    if(vcardObj.fn) {
      if(!nameIndex[vcardObj.fn]) {
        nameIndex[vcardObj.fn]=[];
      }
      nameIndex[vcardObj.fn].push(uuid);
    }
    if(vcardObj.email) {
      for(rel in vcardObj.email) {
        if(!emailIndex[vcardObj.email[rel]]) {
          emailIndex[vcardObj.email[rel]]=[];
        }
        emailIndex[vcardObj.email[rel]].push(uuid);
      }
    }
    updateDom();
  }
  function toMeuteFormat(vcardObj) {
    var meuteObj={};
    var nameParts = vcardObj.fn.split(' ');
    meuteObj.firstName = nameParts[0];
    if(nameParts.length > 2) {
      meuteObj.nickName = nameParts[1];
      meuteObj.lastName = nameParts[2];
    } else if(nameParts.length > 1) {
      meuteObj.lastName = nameParts[1];
    }
    meuteObj.data = {};
    for(var scheme in {'email':1, 'tel':1}) {
      if(vcardObj[scheme]) {
        meuteObj.data[scheme]=[];
        for(var type in vcardObj[scheme]) {
          for(var i=0; i< vcardObj[scheme][type].length; i++) {
            meuteObj.data[scheme].push({
              value: vcardObj[scheme][type][i],
              type: type
            });
          }
        }
      }
    }
    return meuteObj;
  }
  function updateDom() {
    console.log('vcards:');
    console.log(vcards);
    console.log('emailIndex:');
    console.log(emailIndex);
    console.log('nameIndex:');
    console.log(nameIndex);
    for(var key in vcards) {
      document.getElementById('output').innerHTML=JSON.stringify(toMeuteFormat(vcards[key]));
    }
  }
  
  return {
    transformVcardToUnhosted: transform
  };

});

