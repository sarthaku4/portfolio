const fs = require('fs');
let html = fs.readFileSync('p:/portfolio/index.html', 'utf8');

// Remove old script
while (html.includes('<script id="SARTH_INFOCUS_INJECTED">')) {
  const start = html.indexOf('<script id="SARTH_INFOCUS_INJECTED">');
  const end = html.indexOf('</script>', start) + '</script>'.length;
  html = html.slice(0, start) + html.slice(end);
}

const script = `<script id="SARTH_INFOCUS_INJECTED">
(function() {
  var P = [
    ['Midlife Engineering','Sarth Infocus'],
    ['MIDLIFE ENGINEERING','SARTH INFOCUS'],
    ['midlife engineering','sarth infocus'],
    ['midlife needs harmony','sarth needs infocus'],
    ['those in midlife toward','those in life toward'],
    ['Midlife','Sarth'],['MIDLIFE','SARTH'],['midlife','sarth'],
    ['Engineering','Infocus'],['ENGINEERING','INFOCUS'],['engineering','infocus'],
    ['& make harmony','web, graphic & code'],
    ['1042 Studio','Sarthak Ubale'],
    ['Made for focus, rest, and everything in between.','\u0916\u093C\u092F\u093E\u0932\u094B\u0902 \u0915\u094B \u0906\u0915\u093E\u0930 \u0926\u0947\u0928\u0947 \u0915\u0940 \u0915\u0932\u093E\u0964'],
  ];

  function fix(v) {
    if (typeof v !== 'string') return v;
    for (var i=0; i<P.length; i++) v = v.split(P[i][0]).join(P[i][1]);
    return v;
  }

  // ── 1. Intercept document.createTextNode (React's primary way to create text) ──
  var origCTN = Document.prototype.createTextNode;
  Document.prototype.createTextNode = function(data) {
    return origCTN.call(this, fix(data));
  };

  // ── 2. Intercept CharacterData.nodeValue setter (React's way to UPDATE text) ──
  try {
    var cdDesc = Object.getOwnPropertyDescriptor(CharacterData.prototype, 'nodeValue');
    if (cdDesc && cdDesc.set) {
      var origNV = cdDesc.set;
      Object.defineProperty(CharacterData.prototype, 'nodeValue', {
        get: cdDesc.get,
        set: function(v) { origNV.call(this, fix(v)); },
        configurable: true
      });
    }
  } catch(e) {}

  // ── 3. Intercept Node.textContent setter ──
  try {
    var tcDesc = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
    if (tcDesc && tcDesc.set) {
      var origTC = tcDesc.set;
      Object.defineProperty(Node.prototype, 'textContent', {
        get: tcDesc.get,
        set: function(v) { origTC.call(this, fix(v)); },
        configurable: true
      });
    }
  } catch(e) {}

  // ── 4. Strip external links ──
  var KEEP = [/^#svg/,/^#[0-9]/,/^\.\//,/fonts/,/framer/,/sarthak-ubale/,/^javascript:/];
  function stripLinks() {
    try {
      document.querySelectorAll('a[href]').forEach(function(a) {
        var h = a.getAttribute('href')||'';
        if (!KEEP.some(function(r){return r.test(h);})) {
          a.removeAttribute('href');
          a.style.cssText += ';cursor:default!important;text-decoration:none!important;pointer-events:none!important';
        }
      });
    } catch(e) {}
  }

  // ── 5. Backup walker for anything that slips through ──
  function walk() {
    try {
      if (!document.body) return;
      var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      var n;
      while ((n = tw.nextNode())) {
        var r = fix(n.nodeValue);
        if (r !== n.nodeValue) n.nodeValue = r;
      }
      document.title = fix(document.title);
      stripLinks();
    } catch(e) {}
  }

  document.addEventListener('DOMContentLoaded', walk);
  var iv = setInterval(walk, 150);
  setTimeout(function(){ clearInterval(iv); }, 60000);
  document.addEventListener('scroll', walk, {passive:true});
})();
</script>`;

// Inject as FIRST thing in <head>
html = html.replace('<head>', '<head>\n' + script);
fs.writeFileSync('p:/portfolio/index.html', html, 'utf8');

const scriptIdx = html.indexOf('SARTH_INFOCUS_INJECTED');
const framerIdx = html.indexOf('framerusercontent');
console.log('Script at:', scriptIdx, '| Framer at:', framerIdx, '| Script first:', scriptIdx < framerIdx);
console.log('createTextNode intercepted:', html.includes('Document.prototype.createTextNode'));
