/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = window, W = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), J = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== q)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (W && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = J.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && J.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ut = (n) => new rt(typeof n == "string" ? n : n + "", void 0, q), pt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new rt(e, n, q);
}, $t = (n, t) => {
  W ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = H.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, Y = W ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return ut(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var M;
const N = window, Z = N.trustedTypes, vt = Z ? Z.emptyScript : "", G = N.reactiveElementPolyfillSupport, B = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? vt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, lt = (n, t) => t !== n && (t == t || n == n), k = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: lt };
let y = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = k) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const r = this[t];
      this[e] = s, this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || k;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(Y(s));
    } else
      t !== void 0 && e.push(Y(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return $t(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = k) {
    var s;
    const r = this.constructor._$Ep(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : B).toAttribute(e, i.type);
      this._$El = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, r = s._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = s.getPropertyOptions(r), d = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? o.converter : B;
      this._$El = r, this[r] = d.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || lt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, r) => this[r] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var r;
        return (r = s.hostUpdate) === null || r === void 0 ? void 0 : r.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
y.finalized = !0, y.elementProperties = /* @__PURE__ */ new Map(), y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, G == null || G({ ReactiveElement: y }), ((M = N.reactiveElementVersions) !== null && M !== void 0 ? M : N.reactiveElementVersions = []).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j;
const O = window, E = O.trustedTypes, Q = E ? E.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, V = "$lit$", m = `lit$${(Math.random() + "").slice(9)}$`, at = "?" + m, mt = `<${at}>`, g = document, x = () => g.createComment(""), P = (n) => n === null || typeof n != "object" && typeof n != "function", ht = Array.isArray, _t = (n) => ht(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, X = /-->/g, tt = />/g, _ = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, it = /"/g, dt = /^(?:script|style|textarea|title)$/i, ft = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), L = ft(1), b = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), f = g.createTreeWalker(g, 129, null, !1), gt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", o = w;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let $, h, c = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, h = o.exec(a), h !== null); )
      p = o.lastIndex, o === w ? h[1] === "!--" ? o = X : h[1] !== void 0 ? o = tt : h[2] !== void 0 ? (dt.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = _) : h[3] !== void 0 && (o = _) : o === _ ? h[0] === ">" ? (o = s ?? w, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, $ = h[1], o = h[3] === void 0 ? _ : h[3] === '"' ? it : et) : o === it || o === et ? o = _ : o === X || o === tt ? o = w : (o = _, s = void 0);
    const A = o === _ && n[l + 1].startsWith("/>") ? " " : "";
    r += o === w ? a + mt : c >= 0 ? (i.push($), a.slice(0, c) + V + a.slice(c) + m + A) : a + m + (c === -2 ? (i.push(void 0), l) : A);
  }
  const d = r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Q !== void 0 ? Q.createHTML(d) : d, i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const d = t.length - 1, l = this.parts, [a, $] = gt(t, e);
    if (this.el = T.createElement(a, i), f.currentNode = this.el.content, e === 2) {
      const h = this.el.content, c = h.firstChild;
      c.remove(), h.append(...c.childNodes);
    }
    for (; (s = f.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const h = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith(V) || c.startsWith(m)) {
              const p = $[o++];
              if (h.push(c), p !== void 0) {
                const A = s.getAttribute(p.toLowerCase() + V).split(m), v = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: r, name: v[2], strings: A, ctor: v[1] === "." ? yt : v[1] === "?" ? bt : v[1] === "@" ? St : R });
              } else
                l.push({ type: 6, index: r });
            }
          for (const c of h)
            s.removeAttribute(c);
        }
        if (dt.test(s.tagName)) {
          const h = s.textContent.split(m), c = h.length - 1;
          if (c > 0) {
            s.textContent = E ? E.emptyScript : "";
            for (let p = 0; p < c; p++)
              s.append(h[p], x()), f.nextNode(), l.push({ type: 2, index: ++r });
            s.append(h[c], x());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === at)
          l.push({ type: 2, index: r });
        else {
          let h = -1;
          for (; (h = s.data.indexOf(m, h + 1)) !== -1; )
            l.push({ type: 7, index: r }), h += m.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = g.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(n, t, e = n, i) {
  var s, r, o, d;
  if (t === b)
    return t;
  let l = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const a = P(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== a && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), a === void 0 ? l = void 0 : (l = new a(n), l._$AT(n, e, i)), i !== void 0 ? ((o = (d = e)._$Co) !== null && o !== void 0 ? o : d._$Co = [])[i] = l : e._$Cl = l), l !== void 0 && (t = S(n, l._$AS(n, t.values), l, i)), t;
}
class At {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : g).importNode(i, !0);
    f.currentNode = r;
    let o = f.nextNode(), d = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (d === a.index) {
        let $;
        a.type === 2 ? $ = new U(o, o.nextSibling, this, t) : a.type === 1 ? $ = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && ($ = new wt(o, this, t)), this._$AV.push($), a = s[++l];
      }
      d !== (a == null ? void 0 : a.index) && (o = f.nextNode(), d++);
    }
    return f.currentNode = g, r;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
  constructor(t, e, i, s) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), P(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : _t(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== u && P(this._$AH) ? this._$AA.nextSibling.data = t : this.$(g.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.v(i);
    else {
      const o = new At(r, this), d = o.u(this.options);
      o.v(i), this.$(d), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new T(t)), e;
  }
  T(t) {
    ht(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new U(this.k(x()), this.k(x()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class R {
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = S(this, t, e, 0), o = !P(t) || t !== this._$AH && t !== b, o && (this._$AH = t);
    else {
      const d = t;
      let l, a;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        a = S(this, d[i + l], e, l), a === b && (a = this._$AH[l]), o || (o = !P(a) || a !== this._$AH[l]), a === u ? t = u : t !== u && (t += (a ?? "") + r[l + 1]), this._$AH[l] = a;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class yt extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const Et = E ? E.emptyScript : "";
class bt extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== u ? this.element.setAttribute(this.name, Et) : this.element.removeAttribute(this.name);
  }
}
class St extends R {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = S(this, t, e, 0)) !== null && i !== void 0 ? i : u) === b)
      return;
    const s = this._$AH, r = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class wt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const nt = O.litHtmlPolyfillSupport;
nt == null || nt(T, U), ((j = O.litHtmlVersions) !== null && j !== void 0 ? j : O.litHtmlVersions = []).push("2.7.4");
const Ct = (n, t, e) => {
  var i, s;
  const r = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const d = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = o = new U(t.insertBefore(x(), d), d, void 0, e ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var z, I;
class C extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ct(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return b;
  }
}
C.finalized = !0, C._$litElement$ = !0, (z = globalThis.litElementHydrateSupport) === null || z === void 0 || z.call(globalThis, { LitElement: C });
const ot = globalThis.litElementPolyfillSupport;
ot == null || ot({ LitElement: C });
((I = globalThis.litElementVersions) !== null && I !== void 0 ? I : globalThis.litElementVersions = []).push("3.3.2");
class K extends C {
  static get properties() {
    return {
      hass: { type: Object },
      panel: { type: Object }
    };
  }
  willUpdate(t) {
    if (t.has("panel")) {
      const e = this.panel.config.automationHeight ?? 30, i = this.panel.config.summaryHeight ?? 52;
      document.documentElement.style.setProperty(
        "--at-automation-height",
        `${e}px`
      ), document.documentElement.style.setProperty(
        "--at-summary-height",
        `${i}px`
      );
    }
  }
  getAutomations() {
    let t = [];
    return console.log(this.hass.states), Object.keys(this.hass.states).forEach((e) => {
      e.startsWith("automation.") && t.push({
        id: this.hass.states[e].attributes.id,
        friendly_name: this.hass.states[e].attributes.friendly_name,
        last_triggered: this.hass.states[e].attributes.last_triggered,
        path: [],
        state: this.hass.states[e].state
      });
    }), t;
  }
  calculatePath(t) {
    t.forEach((e) => {
      let i = e.friendly_name.split(this.panel.config.divider);
      e.path = i;
    });
  }
  generateTree(t) {
    return t.automations = t.automations.reduce(
      (e, i) => {
        if (i.path.length == 1 && e.push(i), i.path.length > 1) {
          let s = i.path.shift().trim(), r = t.children.find((o) => o.name === s);
          r ? r.automations.push(i) : t.children.push({
            name: s,
            automations: [i],
            children: []
          });
        }
        return e;
      },
      []
    ), t.children.forEach((e) => {
      e = this.generateTree(e);
    }), t;
  }
  renderTree(t, e = 0) {
    return e++, L`
      <div id="automation">
        <details ?open=${e <= this.panel.config.defaultOpenTreeDepth}>
          <summary style=${"padding-left: " + (e * 25 + 10) + "px"}>
            <span> ${t.name} </span>
          </summary>
          ${t.children.map((i) => this.renderTree(i, e))}
          ${t.automations.map((i) => this.renderAutomation(i, e))}
        </details>
      </div>
    `;
  }
  renderAutomation(t, e) {
    return this.calculatePath([t]), L`
      <div
        class="automation ${t.state === "off" ? "disabled" : ""}"
        style=${"padding-left: " + (e * 25 + 35) + "px"}
      >
        <a
          href="/config/automation/edit/${t.id}"
          class="automation-name"
        >
          ${t.path[t.path.length - 1]}
        </a>
        <div class="automation-last-run">
          <a
            href="/config/automation/trace/${t.id}"
            class="automation-trace"
          >
            ${K.fromNow(t.last_triggered)}
          </a>
        </div>
      </div>
    `;
  }
  render() {
    let t = this.getAutomations();
    this.calculatePath(t);
    let e = this.generateTree({
      name: "Automations",
      automations: t,
      children: []
    });
    return L` ${this.renderTree(e)} `;
  }
  /**
   *  * Human readable elapsed or remaining time (example: 3 minutes ago)
   * @param  {Date|Number|String} date A Date object, timestamp or string parsable with Date.parse()
   * @param  {Date|Number|String} [nowDate] A Date object, timestamp or string parsable with Date.parse()
   * @param  {Intl.RelativeTimeFormat} [trf] A Intl formater
   * @return {string} Human readable elapsed or remaining time
   * @author github.com/victornpb
   * @see https://stackoverflow.com/a/67338038/938822
   */
  static fromNow(t, e = Date.now(), i = new Intl.RelativeTimeFormat(void 0, { numeric: "auto" })) {
    if (t == null)
      return "Never";
    const s = 1e3, r = 60 * s, o = 60 * r, d = 24 * o, l = 7 * d, a = 30 * d, $ = 365 * d, h = [
      { ge: $, divisor: $, unit: "year" },
      { ge: a, divisor: a, unit: "month" },
      { ge: l, divisor: l, unit: "week" },
      { ge: d, divisor: d, unit: "day" },
      { ge: o, divisor: o, unit: "hour" },
      { ge: r, divisor: r, unit: "minute" },
      { ge: 30 * s, divisor: s, unit: "seconds" },
      { ge: 0, divisor: 1, text: "just now" }
    ], p = (typeof e == "object" ? e.getTime() : new Date(e).getTime()) - (typeof t == "object" ? t : new Date(t)).getTime(), A = Math.abs(p);
    for (const v of h)
      if (A >= v.ge) {
        const F = Math.round(Math.abs(p) / v.divisor), ct = p < 0;
        return v.unit ? i.format(ct ? F : -F, v.unit) : v.text;
      }
  }
  static get styles() {
    return pt`
      .automation {
        /* you can adjust the height of the elements here */
        height: var(--at-automation-height);
        line-height: var(--at-automation-height);
        border-bottom: 1px solid #9a9a9a;
      }

      summary {
        /* you can adjust the height of the elements here */
        height: var(--at-summary-height);
        line-height: var(--at-summary-height);
        border-bottom: 1px solid #9a9a9a;
      }

      .automation-name {
        color: var(--primary-text-color);
        font-weight: bold;
        text-decoration: none;
      }

      .automation-trace {
        color: var(--primary-text-color);
        text-decoration: none;
      }

      div.automation-last-run {
        float: right;
        padding-right: 15px;
      }

      div.automation a {
        text-decoration: none;
      }

      .disabled {
        text-decoration-line: line-through;
      }
    `;
  }
}
customElements.define("automation-tree", K);
