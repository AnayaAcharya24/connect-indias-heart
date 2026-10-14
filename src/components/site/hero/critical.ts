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
.sh-cur b{display:none}
@media(max-width:700px),(max-aspect-ratio:1/1){
.sac-hero-root .sh-cur i{will-change:transform;backface-visibility:hidden;-webkit-backface-visibility:hidden;contain:layout paint;transform:translate3d(0,0,0);z-index:1}
.sac-hero-root .sh-cur .a{animation:sh-ma 1.6s cubic-bezier(.65,0,.35,1) 1.4s forwards}
.sac-hero-root .sh-cur .b{animation:sh-mb 1.6s cubic-bezier(.65,0,.35,1) 1.4s forwards}
.sac-hero-root .sh-cur u{z-index:3;color:rgba(246,242,234,.95);text-shadow:0 0 24px rgba(233,180,58,.35);font:400 clamp(56px,18vw,84px)/1 Anton,"Arial Narrow",Impact,sans-serif;text-transform:uppercase;letter-spacing:.28em;text-indent:.28em;opacity:0;animation:sh-mw 1.35s linear 0s both}
.sac-hero-root .sh-cur b{display:block;position:absolute;z-index:3;left:50%;top:calc(50% + clamp(56px,18vw,84px)*.62);width:calc(clamp(56px,18vw,84px)*2.6);height:1px;margin-left:calc(clamp(56px,18vw,84px)*-1.3);background:#f0c24b;transform:scaleX(0);animation:sh-ml 1.4s cubic-bezier(.65,0,.35,1) .1s both}
}
@keyframes sh-ma{to{transform:translate3d(-101%,0,0)}}
@keyframes sh-mb{to{transform:translate3d(101%,0,0)}}
@keyframes sh-mw{0%{opacity:0}26%{opacity:1}78%{opacity:1}100%{opacity:0}}
@keyframes sh-ml{0%{transform:scaleX(0);opacity:1}40%{transform:scaleX(1);opacity:1}80%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
@media(prefers-reduced-motion:reduce){.sh-cur{display:none}}
`;

export const heroScrollResetScript = `(function(){try{if(location.pathname!=="/")return;history.scrollRestoration="manual";for(var i=sessionStorage.length-1;i>=0;i--){var k=sessionStorage.key(i);if(k&&k.indexOf("tsr-scroll-restoration")===0)sessionStorage.removeItem(k)}window.scrollTo(0,0)}catch(e){}})();`;
