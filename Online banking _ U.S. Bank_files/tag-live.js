(function(networkId) {
var cacheLifetimeDays = 30;

var customDataWaitForConfig = [
  { on: function() { return Invoca.Client.parseCustomDataField("c3apidt", "Last", "URLParam", ""); }, paramName: "c3apidt", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("C3UID", "Last", "Cookie", "C3UID"); }, paramName: "C3UID", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("ds_k", "Last", "URLParam", ""); }, paramName: "ds_k", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("ecid", "Last", "URLParam", ""); }, paramName: "ecid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("first_page", "First", "JavascriptDataLayer", "window.location.pathname"); }, paramName: "first_page", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("gclid", "Last", "URLParam", ""); }, paramName: "gclid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("gclsrc", "Last", "URLParam", ""); }, paramName: "gclsrc", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("last_page", "Last", "JavascriptDataLayer", "window.location.pathname"); }, paramName: "last_page", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("mcid", "Unique", "Cookie", "mcid"); }, paramName: "mcid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("State", "Unique", "URLParam", ""); }, paramName: "State", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("utm_medium", "Last", "URLParam", ""); }, paramName: "utm_medium", fallbackValue: function() { return Invoca.PNAPI.currentPageSettings.poolParams.utm_medium || null; } },
  { on: function() { return Invoca.Client.parseCustomDataField("utm_source", "Last", "URLParam", ""); }, paramName: "utm_source", fallbackValue: function() { return Invoca.PNAPI.currentPageSettings.poolParams.utm_source || null; } }
];

var defaultCampaignId = null;

var destinationSettings = {
  paramName: null
};

var numbersToReplace = {
  "+18557972903": "304935",
  "+18882912334": "305153",
  "+18773031637": "305154",
  "+18773031639": "305155",
  "+18558158894": "304943",
  "+18668292347": "305156",
  "+18003657772": "315636",
  "+18773031638": "315766",
  "+18666546259": "323636",
  "+18006423547": "323657",
  "+18553267769": "323655",
  "+18889837266": "326084",
  "+18002393302": "326080",
  "+18002363838": "326086",
  "+18008722657": "326082",
  "+18778385287": "326087",
  "+18003980371": "326083",
  "+18004736372": "343201",
  "+18006733555": "312893",
  "+18448724724": "457303",
  "+18772177827": "467984",
  "+16514665070": "466586",
  "+18666815052": "466584",
  "+16514665866": "466594",
  "+12129518549": "466587",
  "+13132344719": "466588",
  "+12129518548": "466593",
  "+16123039880": "481455",
  "+12018150219": "490083",
  "+18667588655": "578022",
  "+18886208772": "578022"
};

var organicSources = true;

var reRunAfter = null;

var requiredParams = null;

var resetCacheOn = ['gclid', 'utm_source', 'utm_medium'];

var waitFor = 0;

var customCodeIsSet = (function() {
  Invoca.Client.customCode = function(options) {
   try {

options.integrations = {
  adobeAnalytics: { 
    username: "675616D751E567410A490D4C@AdobeOrg"
  }
};

var parentNodesToCrawl  = 5; // Used to define how many parent nodes we check for an aria-label
var ARIA_LABEL = "aria-label";
Invoca.Client.nodeArray = []; // Used for tracking nodes replaced by Invoca

// Given a rootNode with a number replaced by Invoca, crawl up the DOM tree to find a aria-label
// Do not crawl up more than specified 'parentNodesToCrawl'
Invoca.Client.findAriaLabelNode = function(rootNode) {
  var currentNode = rootNode;
  for (var i = 0; i <= parentNodesToCrawl; i++) {
    if (currentNode.getAttribute(ARIA_LABEL)) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
};

// Loop through all of the nodes that we replaced with an Invoca number
// Find a corresponding node with aria-label
// Replace the aria-label to have the same text as the node we replaced, so it will have the updated number
// If an aria-label is not found, log it
options.onComplete = function() {
  Invoca.Client.nodeArray.forEach(function(node) {
    var ariaLabelNode = Invoca.Client.findAriaLabelNode(node);
    if (ariaLabelNode) {
      ariaLabelNode.setAttribute(ARIA_LABEL, node.innerText);
    } else {
      Invoca.PNAPI.log("Did not find aria-label element for node " + node.innerHTML);
    }
  });
};

// Store all the nodes that we will replace with an Invoca number
options.onPhoneNumberFound = function(node, request) {
  Invoca.Client.nodeArray.push(node.parentNode);
};

return options;

   } catch (e) {
     Invoca.PNAPI.warn("Custom code block failed: " + e.message);
   }
  };

  return true;
})();

var generatedOptions = {
  autoSwap:            false,
  cookieDays:          cacheLifetimeDays,
  country:             null,
  defaultCampaignId:   defaultCampaignId,
  destinationSettings: destinationSettings,
  disableUrlParams:    ['callCenter','invoca_campaign','profile_name'],
  doNotSwap:           [],
  maxWaitFor:          waitFor,
  networkId:           networkId || null,
  numberToReplace:     numbersToReplace,
  organicSources:      organicSources,
  poolParams:          {},
  reRunAfter:          reRunAfter,
  requiredParams:      requiredParams,
  resetCacheOn:        resetCacheOn,
  waitForData:         customDataWaitForConfig
};

Invoca.Client.startFromWizard(generatedOptions);

})(1444);
