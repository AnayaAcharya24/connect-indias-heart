// Critical hero CSS + pre-paint scroll reset, injected into the homepage <head>
// so the curtain and hero height exist on the very first paint (before hero.css / React).
export const heroCriticalCss = `
.sac-hero-root{background:#0b0a09}
.sh-track{position:relative;height:calc(100vh*3);height:calc(100svh*3)}
@media(pointer:coarse){.sh-track{height:calc(100vh*3.8);height:calc(100svh*3.8)}}
.sh-hero{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;background:#0b0a09}
.sh-cur{position:fixed;inset:0;width:100vw;height:100vh;height:100dvh;z-index:2147483647;pointer-events:none;overflow:hidden}
.sh-cur i{position:absolute;top:0;bottom:0;width:50.3%;background:#0a0908}
.sh-cur .a{left:0;border-right:2px solid #f0c24b;animation:sh-ca 1.15s cubic-bezier(.76,0,.18,1) .6s forwards}
.sh-cur .b{right:0;border-left:2px solid #f0c24b;animation:sh-cb 1.15s cubic-bezier(.76,0,.18,1) .6s forwards}
.sh-cur u{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-decoration:none;color:#fff;font:400 22px Anton,"Arial Narrow",Impact,sans-serif;letter-spacing:.3em;white-space:nowrap;animation:sh-cm .9s ease .05s both}
@keyframes sh-ca{to{transform:translateX(-101%)}}
@keyframes sh-cb{to{transform:translateX(101%)}}
@keyframes sh-cm{0%{opacity:0}40%{opacity:1}100%{opacity:0}}
@media(prefers-reduced-motion:reduce){.sh-cur{display:none}}
`;

export const heroScrollResetScript = `(function(){try{if(location.pathname!=="/")return;history.scrollRestoration="manual";for(var i=sessionStorage.length-1;i>=0;i--){var k=sessionStorage.key(i);if(k&&k.indexOf("tsr-scroll-restoration")===0)sessionStorage.removeItem(k)}window.scrollTo(0,0)}catch(e){}})();`;
