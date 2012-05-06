define(['javascripts/scripts/vcard.js'], function(){
  function toObjects(vcardsStr, cb) {
    var arr = [];
    var parts = vcardsStr.split('BEGIN:VCARD');
    for(var i =0; i<parts.length;i++) {
      if(parts[i].indexOf('END:VCARD') != -1) {
        cb(vCard.initialize('BEGIN:VCARD'+parts[i]));
      }
    }
  }
  function addToIndexes(vcardObj, uuid, nameIndex, emailIndex) {
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
  }
  function toMeuteFormat(vcardObj) {
    var meuteObj={};
    var nameParts = vcardObj.fn.split(' ');
    meuteObj.firstName = nameParts[0];
    if(nameParts.length > 2) {
      meuteObj.nickName = nameParts[1];
      meuteObj.lastName = nameParts[2];
    } else if(nameParts.length > 1) {
      meuteObj.nickName = '';
      meuteObj.lastName = nameParts[1];
    } else {
      meuteObj.nickName = '';
      meuteObj.lastName = '';
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
  return {
    toObjects: toObjects,//takes a long string and a per-object callback
    toMeuteFormat: toMeuteFormat//takes an object, returns a Meute format object
  };
});
