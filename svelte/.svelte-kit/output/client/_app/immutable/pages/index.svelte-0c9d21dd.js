import {
    S as gt,
    i as pt,
    s as bt,
    e as F,
    t as K,
    c as U,
    a as A,
    h as Z,
    d as v,
    b as _,
    g as le,
    J as k,
    j as tt,
    k as G,
    m as H,
    K as ce,
    L as ue,
    M as nt,
    n as xe,
    N as De,
} from '../chunks/index-e6474461.js'
function x(t, e) {
    if (!t) throw new Error(e)
}
const yt = 34028234663852886e22,
    wt = -34028234663852886e22,
    kt = 4294967295,
    Nt = 2147483647,
    Tt = -2147483648
function ae(t) {
    if (typeof t != 'number') throw new Error('invalid int 32: ' + typeof t)
    if (!Number.isInteger(t) || t > Nt || t < Tt)
        throw new Error('invalid int 32: ' + t)
}
function ye(t) {
    if (typeof t != 'number') throw new Error('invalid uint 32: ' + typeof t)
    if (!Number.isInteger(t) || t > kt || t < 0)
        throw new Error('invalid uint 32: ' + t)
}
function rt(t) {
    if (typeof t != 'number') throw new Error('invalid float 32: ' + typeof t)
    if (!!Number.isFinite(t) && (t > yt || t < wt))
        throw new Error('invalid float 32: ' + t)
}
const st = Symbol('@bufbuild/protobuf/enum-type')
function It(t) {
    const e = t[st]
    return x(e, 'missing enum type on enum object'), e
}
function it(t, e, n) {
    t[st] = at(e, n)
}
function at(t, e) {
    const n = Object.create(null),
        s = Object.create(null),
        r = []
    for (const i of e) r.push(i), (n[i.name] = i), (s[i.no] = i)
    return {
        typeName: t,
        values: r,
        findName(i) {
            return n[i]
        },
        findNumber(i) {
            return s[i]
        },
    }
}
function vt(t, e, n) {
    const s = {}
    for (const r of e) {
        const i = Et(r, n == null ? void 0 : n.sharedPrefix)
        ;(s[i] = r.no), (s[r.no] = i)
    }
    return it(s, t, e), s
}
function Et(t, e) {
    return e === void 0 || !t.name.startsWith(e)
        ? t.name
        : t.name.substring(e.length)
}
class ot {
    equals(e) {
        return this.getType().runtime.util.equals(this.getType(), this, e)
    }
    clone() {
        return this.getType().runtime.util.clone(this)
    }
    fromBinary(e, n) {
        const s = this.getType(),
            r = s.runtime.bin,
            i = r.makeReadOptions(n)
        return r.readMessage(this, i.readerFactory(e), e.byteLength, i), this
    }
    fromJson(e, n) {
        const s = this.getType(),
            r = s.runtime.json,
            i = r.makeReadOptions(n)
        return r.readMessage(s, e, i, this), this
    }
    fromJsonString(e, n) {
        return this.fromJson(JSON.parse(e), n)
    }
    toBinary(e) {
        const n = this.getType(),
            s = n.runtime.bin,
            r = s.makeWriteOptions(e),
            i = r.writerFactory()
        return s.writeMessage(this, i, r), i.finish()
    }
    toJson(e) {
        const n = this.getType(),
            s = n.runtime.json,
            r = s.makeWriteOptions(e)
        return s.writeMessage(this, r)
    }
    toJsonString(e) {
        var n
        const s = this.toJson(e)
        return JSON.stringify(
            s,
            null,
            (n = e == null ? void 0 : e.prettySpaces) !== null && n !== void 0
                ? n
                : 0
        )
    }
    getType() {
        return Object.getPrototypeOf(this).constructor
    }
}
function Ot(t, e, n, s) {
    var r
    const i =
            (r = s == null ? void 0 : s.localName) !== null && r !== void 0
                ? r
                : e.substring(e.lastIndexOf('.') + 1),
        a = {
            [i]: function (o) {
                t.util.initFields(this), t.util.initPartial(o, this)
            },
        }[i]
    return (
        Object.setPrototypeOf(a.prototype, new ot()),
        Object.assign(a, {
            runtime: t,
            typeName: e,
            fields: t.util.newFieldList(n),
            fromBinary(o, c) {
                return new a().fromBinary(o, c)
            },
            fromJson(o, c) {
                return new a().fromJson(o, c)
            },
            fromJsonString(o, c) {
                return new a().fromJsonString(o, c)
            },
            equals(o, c) {
                return t.util.equals(a, o, c)
            },
        }),
        a
    )
}
function St(t, e, n, s) {
    return {
        syntax: t,
        json: e,
        bin: n,
        util: s,
        makeMessageType(r, i, a) {
            return Ot(this, r, i, a)
        },
        makeEnum: vt,
        makeEnumType: at,
        getEnumType: It,
    }
}
var f
;(function (t) {
    ;(t[(t.DOUBLE = 1)] = 'DOUBLE'),
        (t[(t.FLOAT = 2)] = 'FLOAT'),
        (t[(t.INT64 = 3)] = 'INT64'),
        (t[(t.UINT64 = 4)] = 'UINT64'),
        (t[(t.INT32 = 5)] = 'INT32'),
        (t[(t.FIXED64 = 6)] = 'FIXED64'),
        (t[(t.FIXED32 = 7)] = 'FIXED32'),
        (t[(t.BOOL = 8)] = 'BOOL'),
        (t[(t.STRING = 9)] = 'STRING'),
        (t[(t.BYTES = 12)] = 'BYTES'),
        (t[(t.UINT32 = 13)] = 'UINT32'),
        (t[(t.SFIXED32 = 15)] = 'SFIXED32'),
        (t[(t.SFIXED64 = 16)] = 'SFIXED64'),
        (t[(t.SINT32 = 17)] = 'SINT32'),
        (t[(t.SINT64 = 18)] = 'SINT64')
})(f || (f = {}))
function Ft() {
    let t = 0,
        e = 0
    for (let s = 0; s < 28; s += 7) {
        let r = this.buf[this.pos++]
        if (((t |= (r & 127) << s), (r & 128) == 0))
            return this.assertBounds(), [t, e]
    }
    let n = this.buf[this.pos++]
    if (((t |= (n & 15) << 28), (e = (n & 112) >> 4), (n & 128) == 0))
        return this.assertBounds(), [t, e]
    for (let s = 3; s <= 31; s += 7) {
        let r = this.buf[this.pos++]
        if (((e |= (r & 127) << s), (r & 128) == 0))
            return this.assertBounds(), [t, e]
    }
    throw new Error('invalid varint')
}
function me(t, e, n) {
    for (let i = 0; i < 28; i = i + 7) {
        const a = t >>> i,
            o = !(a >>> 7 == 0 && e == 0),
            c = (o ? a | 128 : a) & 255
        if ((n.push(c), !o)) return
    }
    const s = ((t >>> 28) & 15) | ((e & 7) << 4),
        r = e >> 3 != 0
    if ((n.push((r ? s | 128 : s) & 255), !!r)) {
        for (let i = 3; i < 31; i = i + 7) {
            const a = e >>> i,
                o = a >>> 7 != 0,
                c = (o ? a | 128 : a) & 255
            if ((n.push(c), !o)) return
        }
        n.push((e >>> 31) & 1)
    }
}
const oe = (1 << 16) * (1 << 16)
function $e(t) {
    let e = t[0] == '-'
    e && (t = t.slice(1))
    const n = 1e6
    let s = 0,
        r = 0
    function i(a, o) {
        const c = Number(t.slice(a, o))
        ;(r *= n),
            (s = s * n + c),
            s >= oe && ((r = r + ((s / oe) | 0)), (s = s % oe))
    }
    return i(-24, -18), i(-18, -12), i(-12, -6), i(-6), [e, s, r]
}
function ge(t, e) {
    if (e <= 2097151) return '' + (oe * e + t)
    let n = t & 16777215,
        s = (((t >>> 24) | (e << 8)) >>> 0) & 16777215,
        r = (e >> 16) & 65535,
        i = n + s * 6777216 + r * 6710656,
        a = s + r * 8147497,
        o = r * 2,
        c = 1e7
    i >= c && ((a += Math.floor(i / c)), (i %= c)),
        a >= c && ((o += Math.floor(a / c)), (a %= c))
    function u(h, l) {
        let d = h ? String(h) : ''
        return l ? '0000000'.slice(d.length) + d : d
    }
    return u(o, 0) + u(a, o) + u(i, 1)
}
function Je(t, e) {
    if (t >= 0) {
        for (; t > 127; ) e.push((t & 127) | 128), (t = t >>> 7)
        e.push(t)
    } else {
        for (let n = 0; n < 9; n++) e.push((t & 127) | 128), (t = t >> 7)
        e.push(1)
    }
}
function Ut() {
    let t = this.buf[this.pos++],
        e = t & 127
    if ((t & 128) == 0) return this.assertBounds(), e
    if (((t = this.buf[this.pos++]), (e |= (t & 127) << 7), (t & 128) == 0))
        return this.assertBounds(), e
    if (((t = this.buf[this.pos++]), (e |= (t & 127) << 14), (t & 128) == 0))
        return this.assertBounds(), e
    if (((t = this.buf[this.pos++]), (e |= (t & 127) << 21), (t & 128) == 0))
        return this.assertBounds(), e
    ;(t = this.buf[this.pos++]), (e |= (t & 15) << 28)
    for (let n = 5; (t & 128) !== 0 && n < 10; n++) t = this.buf[this.pos++]
    if ((t & 128) != 0) throw new Error('invalid varint')
    return this.assertBounds(), e >>> 0
}
function Bt() {
    const t = new DataView(new ArrayBuffer(8))
    if (
        globalThis.BigInt !== void 0 &&
        typeof t.getBigInt64 == 'function' &&
        typeof t.getBigUint64 == 'function' &&
        typeof t.setBigInt64 == 'function' &&
        typeof t.setBigUint64 == 'function'
    ) {
        const n = BigInt('-9223372036854775808'),
            s = BigInt('9223372036854775807'),
            r = BigInt('0'),
            i = BigInt('18446744073709551615')
        return {
            zero: BigInt(0),
            supported: !0,
            parse(a) {
                const o = typeof a == 'bigint' ? a : BigInt(a)
                if (o > s || o < n) throw new Error(`int64 invalid: ${a}`)
                return o
            },
            uParse(a) {
                const o = typeof a == 'bigint' ? a : BigInt(a)
                if (o > i || o < r) throw new Error(`uint64 invalid: ${a}`)
                return o
            },
            enc(a) {
                return (
                    t.setBigInt64(0, this.parse(a), !0),
                    { lo: t.getInt32(0, !0), hi: t.getInt32(4, !0) }
                )
            },
            uEnc(a) {
                return (
                    t.setBigInt64(0, this.uParse(a), !0),
                    { lo: t.getInt32(0, !0), hi: t.getInt32(4, !0) }
                )
            },
            dec(a, o) {
                return (
                    t.setInt32(0, a, !0),
                    t.setInt32(4, o, !0),
                    t.getBigInt64(0, !0)
                )
            },
            uDec(a, o) {
                return (
                    t.setInt32(0, a, !0),
                    t.setInt32(4, o, !0),
                    t.getBigUint64(0, !0)
                )
            },
        }
    }
    return {
        zero: '0',
        supported: !1,
        parse(n) {
            if (!/^-?[0-9]+$/.test(n)) throw new Error(`int64 invalid: ${n}`)
            return n
        },
        uParse(n) {
            if (!/^-?[0-9]+$/.test(n)) throw new Error(`uint64 invalid: ${n}`)
            return n
        },
        enc(n) {
            if (typeof n == 'string') {
                if (!/^-?[0-9]+$/.test(n))
                    throw new Error(`int64 invalid: ${n}`)
            } else n = n.toString(10)
            const [, s, r] = $e(n)
            return { lo: s, hi: r }
        },
        uEnc(n) {
            if (typeof n == 'string') {
                if (!/^-?[0-9]+$/.test(n))
                    throw new Error(`uint64 invalid: ${n}`)
            } else n = n.toString(10)
            const [s, r, i] = $e(n)
            if (s) throw new Error(`uint64 invalid: ${n}`)
            return { lo: r, hi: i }
        },
        dec(n, s) {
            return (s & 2147483648) !== 0
                ? ((s = ~s), n ? (n = ~n + 1) : (s += 1), '-' + ge(n, s))
                : ge(n, s)
        },
        uDec(n, s) {
            return ge(n, s)
        },
    }
}
const B = Bt()
var T
;(function (t) {
    ;(t[(t.Varint = 0)] = 'Varint'),
        (t[(t.Bit64 = 1)] = 'Bit64'),
        (t[(t.LengthDelimited = 2)] = 'LengthDelimited'),
        (t[(t.StartGroup = 3)] = 'StartGroup'),
        (t[(t.EndGroup = 4)] = 'EndGroup'),
        (t[(t.Bit32 = 5)] = 'Bit32')
})(T || (T = {}))
class At {
    constructor(e) {
        ;(this.stack = []),
            (this.textEncoder = e != null ? e : new TextEncoder()),
            (this.chunks = []),
            (this.buf = [])
    }
    finish() {
        this.chunks.push(new Uint8Array(this.buf))
        let e = 0
        for (let r = 0; r < this.chunks.length; r++) e += this.chunks[r].length
        let n = new Uint8Array(e),
            s = 0
        for (let r = 0; r < this.chunks.length; r++)
            n.set(this.chunks[r], s), (s += this.chunks[r].length)
        return (this.chunks = []), n
    }
    fork() {
        return (
            this.stack.push({ chunks: this.chunks, buf: this.buf }),
            (this.chunks = []),
            (this.buf = []),
            this
        )
    }
    join() {
        let e = this.finish(),
            n = this.stack.pop()
        if (!n) throw new Error('invalid state, fork stack empty')
        return (
            (this.chunks = n.chunks),
            (this.buf = n.buf),
            this.uint32(e.byteLength),
            this.raw(e)
        )
    }
    tag(e, n) {
        return this.uint32(((e << 3) | n) >>> 0)
    }
    raw(e) {
        return (
            this.buf.length &&
                (this.chunks.push(new Uint8Array(this.buf)), (this.buf = [])),
            this.chunks.push(e),
            this
        )
    }
    uint32(e) {
        for (ye(e); e > 127; ) this.buf.push((e & 127) | 128), (e = e >>> 7)
        return this.buf.push(e), this
    }
    int32(e) {
        return ae(e), Je(e, this.buf), this
    }
    bool(e) {
        return this.buf.push(e ? 1 : 0), this
    }
    bytes(e) {
        return this.uint32(e.byteLength), this.raw(e)
    }
    string(e) {
        let n = this.textEncoder.encode(e)
        return this.uint32(n.byteLength), this.raw(n)
    }
    float(e) {
        rt(e)
        let n = new Uint8Array(4)
        return new DataView(n.buffer).setFloat32(0, e, !0), this.raw(n)
    }
    double(e) {
        let n = new Uint8Array(8)
        return new DataView(n.buffer).setFloat64(0, e, !0), this.raw(n)
    }
    fixed32(e) {
        ye(e)
        let n = new Uint8Array(4)
        return new DataView(n.buffer).setUint32(0, e, !0), this.raw(n)
    }
    sfixed32(e) {
        ae(e)
        let n = new Uint8Array(4)
        return new DataView(n.buffer).setInt32(0, e, !0), this.raw(n)
    }
    sint32(e) {
        return ae(e), (e = ((e << 1) ^ (e >> 31)) >>> 0), Je(e, this.buf), this
    }
    sfixed64(e) {
        let n = new Uint8Array(8),
            s = new DataView(n.buffer),
            r = B.enc(e)
        return s.setInt32(0, r.lo, !0), s.setInt32(4, r.hi, !0), this.raw(n)
    }
    fixed64(e) {
        let n = new Uint8Array(8),
            s = new DataView(n.buffer),
            r = B.uEnc(e)
        return s.setInt32(0, r.lo, !0), s.setInt32(4, r.hi, !0), this.raw(n)
    }
    int64(e) {
        let n = B.enc(e)
        return me(n.lo, n.hi, this.buf), this
    }
    sint64(e) {
        let n = B.enc(e),
            s = n.hi >> 31,
            r = (n.lo << 1) ^ s,
            i = ((n.hi << 1) | (n.lo >>> 31)) ^ s
        return me(r, i, this.buf), this
    }
    uint64(e) {
        let n = B.uEnc(e)
        return me(n.lo, n.hi, this.buf), this
    }
}
class _t {
    constructor(e, n) {
        ;(this.varint64 = Ft),
            (this.uint32 = Ut),
            (this.buf = e),
            (this.len = e.length),
            (this.pos = 0),
            (this.view = new DataView(e.buffer, e.byteOffset, e.byteLength)),
            (this.textDecoder = n != null ? n : new TextDecoder())
    }
    tag() {
        let e = this.uint32(),
            n = e >>> 3,
            s = e & 7
        if (n <= 0 || s < 0 || s > 5)
            throw new Error('illegal tag: field no ' + n + ' wire type ' + s)
        return [n, s]
    }
    skip(e) {
        let n = this.pos
        switch (e) {
            case T.Varint:
                for (; this.buf[this.pos++] & 128; );
                break
            case T.Bit64:
                this.pos += 4
            case T.Bit32:
                this.pos += 4
                break
            case T.LengthDelimited:
                let s = this.uint32()
                this.pos += s
                break
            case T.StartGroup:
                let r
                for (; (r = this.tag()[1]) !== T.EndGroup; ) this.skip(r)
                break
            default:
                throw new Error('cant skip wire type ' + e)
        }
        return this.assertBounds(), this.buf.subarray(n, this.pos)
    }
    assertBounds() {
        if (this.pos > this.len) throw new RangeError('premature EOF')
    }
    int32() {
        return this.uint32() | 0
    }
    sint32() {
        let e = this.uint32()
        return (e >>> 1) ^ -(e & 1)
    }
    int64() {
        return B.dec(...this.varint64())
    }
    uint64() {
        return B.uDec(...this.varint64())
    }
    sint64() {
        let [e, n] = this.varint64(),
            s = -(e & 1)
        return (
            (e = ((e >>> 1) | ((n & 1) << 31)) ^ s),
            (n = (n >>> 1) ^ s),
            B.dec(e, n)
        )
    }
    bool() {
        let [e, n] = this.varint64()
        return e !== 0 || n !== 0
    }
    fixed32() {
        return this.view.getUint32((this.pos += 4) - 4, !0)
    }
    sfixed32() {
        return this.view.getInt32((this.pos += 4) - 4, !0)
    }
    fixed64() {
        return B.uDec(this.sfixed32(), this.sfixed32())
    }
    sfixed64() {
        return B.dec(this.sfixed32(), this.sfixed32())
    }
    float() {
        return this.view.getFloat32((this.pos += 4) - 4, !0)
    }
    double() {
        return this.view.getFloat64((this.pos += 8) - 8, !0)
    }
    bytes() {
        let e = this.uint32(),
            n = this.pos
        return (this.pos += e), this.assertBounds(), this.buf.subarray(n, n + e)
    }
    string() {
        return this.textDecoder.decode(this.bytes())
    }
}
function fe(t, e) {
    if (e instanceof t) return e
    if (t.fieldWrapper) return t.fieldWrapper.wrapField(e)
    throw new Error(
        `cannot unwrap field value, ${t.typeName} does not define a field wrapper`
    )
}
function ct(t, e) {
    return t.fieldWrapper ? t.fieldWrapper.unwrapField(e) : e
}
function X(t, e, n) {
    if (e === n) return !0
    if (t == f.BYTES) {
        if (
            !(e instanceof Uint8Array) ||
            !(n instanceof Uint8Array) ||
            e.length !== n.length
        )
            return !1
        for (let s = 0; s < e.length; s++) if (e[s] !== n[s]) return !1
        return !0
    }
    switch (t) {
        case f.UINT64:
        case f.FIXED64:
        case f.INT64:
        case f.SFIXED64:
        case f.SINT64:
            return e == n
    }
    return !1
}
function we(t) {
    switch (t) {
        case f.BOOL:
            return !1
        case f.UINT64:
        case f.FIXED64:
        case f.INT64:
        case f.SFIXED64:
        case f.SINT64:
            return B.zero
        case f.DOUBLE:
        case f.FLOAT:
            return 0
        case f.BYTES:
            return new Uint8Array(0)
        case f.STRING:
            return ''
        default:
            return 0
    }
}
function ve(t, e) {
    const n = e === void 0
    let s = T.Varint,
        r = e === 0
    switch (t) {
        case f.STRING:
            ;(r = n || !e.length), (s = T.LengthDelimited)
            break
        case f.BOOL:
            r = e === !1
            break
        case f.DOUBLE:
            s = T.Bit64
            break
        case f.FLOAT:
            s = T.Bit32
            break
        case f.INT64:
            r = n || e == 0
            break
        case f.UINT64:
            r = n || e == 0
            break
        case f.FIXED64:
            ;(r = n || e == 0), (s = T.Bit64)
            break
        case f.BYTES:
            ;(r = n || !e.byteLength), (s = T.LengthDelimited)
            break
        case f.FIXED32:
            s = T.Bit32
            break
        case f.SFIXED32:
            s = T.Bit32
            break
        case f.SFIXED64:
            ;(r = n || e == 0), (s = T.Bit64)
            break
        case f.SINT64:
            r = n || e == 0
            break
    }
    const i = f[t].toLowerCase()
    return [s, i, n || r]
}
const j = Symbol('@bufbuild/protobuf/unknown-fields'),
    Le = { readUnknownFields: !0, readerFactory: (t) => new _t(t) },
    Re = { writeUnknownFields: !0, writerFactory: () => new At() }
function xt(t) {
    return t ? Object.assign(Object.assign({}, Le), t) : Le
}
function Dt(t) {
    return t ? Object.assign(Object.assign({}, Re), t) : Re
}
function $t() {
    return {
        makeReadOptions: xt,
        makeWriteOptions: Dt,
        listUnknownFields(t) {
            var e
            return (e = t[j]) !== null && e !== void 0 ? e : []
        },
        discardUnknownFields(t) {
            delete t[j]
        },
        writeUnknownFields(t, e) {
            const s = t[j]
            if (s) for (const r of s) e.tag(r.no, r.wireType).raw(r.data)
        },
        onUnknownField(t, e, n, s) {
            const r = t
            Array.isArray(r[j]) || (r[j] = []),
                r[j].push({ no: e, wireType: n, data: s })
        },
        readMessage(t, e, n, s) {
            const r = t.getType(),
                i = n === void 0 ? e.len : e.pos + n
            for (; e.pos < i; ) {
                const [a, o] = e.tag(),
                    c = r.fields.find(a)
                if (!c) {
                    const d = e.skip(o)
                    s.readUnknownFields && this.onUnknownField(t, a, o, d)
                    continue
                }
                let u = t,
                    h = c.repeated,
                    l = c.localName
                switch (
                    (c.oneof &&
                        ((u = u[c.oneof.localName]),
                        u.case != l && delete u.value,
                        (u.case = l),
                        (l = 'value')),
                    c.kind)
                ) {
                    case 'scalar':
                    case 'enum':
                        const d = c.kind == 'enum' ? f.INT32 : c.T
                        if (h) {
                            let y = u[l]
                            if (
                                o == T.LengthDelimited &&
                                d != f.STRING &&
                                d != f.BYTES
                            ) {
                                let I = e.uint32() + e.pos
                                for (; e.pos < I; ) y.push(te(e, d))
                            } else y.push(te(e, d))
                        } else u[l] = te(e, d)
                        break
                    case 'message':
                        const g = c.T
                        h
                            ? u[l].push(g.fromBinary(e.bytes(), s))
                            : u[l] instanceof g
                            ? u[l].fromBinary(e.bytes(), s)
                            : (u[l] = ct(g, g.fromBinary(e.bytes(), s)))
                        break
                    case 'map':
                        let [b, w] = Jt(c, e, s)
                        u[l][b] = w
                        break
                }
            }
        },
    }
}
function Jt(t, e, n) {
    const s = e.uint32(),
        r = e.pos + s
    let i, a
    for (; e.pos < r; ) {
        let [o] = e.tag()
        switch (o) {
            case 1:
                i = te(e, t.K)
                break
            case 2:
                switch (t.V.kind) {
                    case 'scalar':
                        a = te(e, t.V.T)
                        break
                    case 'enum':
                        a = e.int32()
                        break
                    case 'message':
                        a = t.V.T.fromBinary(e.bytes(), n)
                        break
                }
                break
        }
    }
    if (i === void 0) {
        let o = we(t.K)
        i = t.K == f.BOOL ? o.toString() : o
    }
    if (
        (typeof i != 'string' && typeof i != 'number' && (i = i.toString()),
        a === void 0)
    )
        switch (t.V.kind) {
            case 'scalar':
                a = we(t.V.T)
                break
            case 'enum':
                a = 0
                break
            case 'message':
                a = new t.V.T()
                break
        }
    return [i, a]
}
function te(t, e) {
    let [, n] = ve(e)
    return t[n]()
}
function Lt(t, e, n, s, r) {
    t.tag(n.no, T.LengthDelimited), t.fork()
    let i = s
    switch (n.K) {
        case f.INT32:
        case f.FIXED32:
        case f.UINT32:
        case f.SFIXED32:
        case f.SINT32:
            i = Number.parseInt(s)
            break
        case f.BOOL:
            x(s == 'true' || s == 'false'), (i = s == 'true')
            break
    }
    switch ((ne(t, n.K, 1, i, !0), n.V.kind)) {
        case 'scalar':
            ne(t, n.V.T, 2, r, !0)
            break
        case 'enum':
            ne(t, f.INT32, 2, r, !0)
            break
        case 'message':
            ke(t, e, n.V.T, 2, r)
            break
    }
    t.join()
}
function ke(t, e, n, s, r) {
    if (r !== void 0) {
        const i = fe(n, r)
        t.tag(s, T.LengthDelimited).bytes(i.toBinary(e))
    }
}
function ne(t, e, n, s, r) {
    let [i, a, o] = ve(e, s)
    ;(!o || r) && t.tag(n, i)[a](s)
}
function Rt(t, e, n, s) {
    if (!s.length) return
    t.tag(n, T.LengthDelimited).fork()
    let [, r] = ve(e)
    for (let i = 0; i < s.length; i++) t[r](s[i])
    t.join()
}
function Mt() {
    return Object.assign(Object.assign({}, $t()), {
        writeMessage(t, e, n) {
            const s = t.getType()
            for (const r of s.fields.byNumber()) {
                let i,
                    a = r.repeated,
                    o = r.localName
                if (r.oneof) {
                    const c = t[r.oneof.localName]
                    if (c.case !== o) continue
                    i = c.value
                } else i = t[o]
                switch (r.kind) {
                    case 'scalar':
                    case 'enum':
                        let c = r.kind == 'enum' ? f.INT32 : r.T
                        if (a)
                            if (r.packed) Rt(e, c, r.no, i)
                            else for (const u of i) ne(e, c, r.no, u, !0)
                        else
                            i !== void 0 &&
                                ne(e, c, r.no, i, !!r.oneof || r.opt)
                        break
                    case 'message':
                        if (a) for (const u of i) ke(e, n, r.T, r.no, u)
                        else ke(e, n, r.T, r.no, i)
                        break
                    case 'map':
                        for (const [u, h] of Object.entries(i))
                            Lt(e, n, r, u, h)
                        break
                }
            }
            return n.writeUnknownFields && this.writeUnknownFields(t, e), e
        },
    })
}
let M =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
            ''
        ),
    de = []
for (let t = 0; t < M.length; t++) de[M[t].charCodeAt(0)] = t
de['-'.charCodeAt(0)] = M.indexOf('+')
de['_'.charCodeAt(0)] = M.indexOf('/')
const ut = {
        dec(t) {
            let e = (t.length * 3) / 4
            t[t.length - 2] == '='
                ? (e -= 2)
                : t[t.length - 1] == '=' && (e -= 1)
            let n = new Uint8Array(e),
                s = 0,
                r = 0,
                i,
                a = 0
            for (let o = 0; o < t.length; o++) {
                if (((i = de[t.charCodeAt(o)]), i === void 0))
                    switch (t[o]) {
                        case '=':
                            r = 0
                        case `
`:
                        case '\r':
                        case '	':
                        case ' ':
                            continue
                        default:
                            throw Error('invalid base64 string.')
                    }
                switch (r) {
                    case 0:
                        ;(a = i), (r = 1)
                        break
                    case 1:
                        ;(n[s++] = (a << 2) | ((i & 48) >> 4)), (a = i), (r = 2)
                        break
                    case 2:
                        ;(n[s++] = ((a & 15) << 4) | ((i & 60) >> 2)),
                            (a = i),
                            (r = 3)
                        break
                    case 3:
                        ;(n[s++] = ((a & 3) << 6) | i), (r = 0)
                        break
                }
            }
            if (r == 1) throw Error('invalid base64 string.')
            return n.subarray(0, s)
        },
        enc(t) {
            let e = '',
                n = 0,
                s,
                r = 0
            for (let i = 0; i < t.length; i++)
                switch (((s = t[i]), n)) {
                    case 0:
                        ;(e += M[s >> 2]), (r = (s & 3) << 4), (n = 1)
                        break
                    case 1:
                        ;(e += M[r | (s >> 4)]), (r = (s & 15) << 2), (n = 2)
                        break
                    case 2:
                        ;(e += M[r | (s >> 6)]), (e += M[s & 63]), (n = 0)
                        break
                }
            return n && ((e += M[r]), (e += '='), n == 1 && (e += '=')), e
        },
    },
    Me = { ignoreUnknownFields: !1 },
    Pe = {
        emitDefaultValues: !1,
        enumAsInteger: !1,
        useProtoFieldName: !1,
        prettySpaces: 0,
    }
function Pt(t) {
    return t ? Object.assign(Object.assign({}, Me), t) : Me
}
function Vt(t) {
    return t ? Object.assign(Object.assign({}, Pe), t) : Pe
}
function Xt(t) {
    const e = t(zt, Ve)
    return {
        makeReadOptions: Pt,
        makeWriteOptions: Vt,
        readMessage(n, s, r, i) {
            if (s == null || Array.isArray(s) || typeof s != 'object')
                throw new Error(
                    `cannot decode message ${
                        n.typeName
                    } from JSON: ${this.debug(s)}`
                )
            i = i != null ? i : new n()
            const a = {}
            for (const [o, c] of Object.entries(s)) {
                const u = n.fields.findJsonName(o)
                if (!u) {
                    if (!r.ignoreUnknownFields)
                        throw new Error(
                            `cannot decode message ${n.typeName} from JSON: key "${o}" is unknown`
                        )
                    continue
                }
                let h = u.localName,
                    l = i
                if (u.oneof) {
                    if (c === null && u.kind == 'scalar') continue
                    const d = a[u.oneof.localName]
                    if (d)
                        throw new Error(
                            `cannot decode message ${n.typeName} from JSON: multiple keys for oneof "${u.oneof.name}" present: "${d}", "${o}"`
                        )
                    ;(a[u.oneof.localName] = o),
                        (l = l[u.oneof.localName] = { case: h }),
                        (h = 'value')
                }
                if (u.repeated) {
                    if (c === null) continue
                    if (!Array.isArray(c))
                        throw new Error(
                            `cannot decode field ${n.typeName}.${
                                u.name
                            } from JSON: "${this.debug(c)}"`
                        )
                    const d = l[h]
                    for (const g of c) {
                        if (g === null)
                            throw new Error(
                                `cannot decode field ${n.typeName}.${
                                    u.name
                                } from JSON: "${this.debug(g)}"`
                            )
                        let b
                        switch (u.kind) {
                            case 'message':
                                b = u.T.fromJson(g, r)
                                break
                            case 'enum':
                                if (
                                    ((b = pe(u.T, g, r.ignoreUnknownFields)),
                                    b === void 0)
                                )
                                    continue
                                break
                            case 'scalar':
                                try {
                                    b = ee(u.T, g)
                                } catch (w) {
                                    let y = `cannot decode field ${
                                        n.typeName
                                    }.${u.name} from JSON: "${this.debug(g)}"`
                                    throw (
                                        (w instanceof Error &&
                                            w.message.length > 0 &&
                                            (y += `: ${w.message}`),
                                        new Error(y))
                                    )
                                }
                                break
                        }
                        d.push(b)
                    }
                } else if (u.kind == 'map') {
                    if (c === null) continue
                    if (Array.isArray(c) || typeof c != 'object')
                        throw new Error(
                            `cannot decode field ${n.typeName}.${
                                u.name
                            } from JSON: ${this.debug(c)}`
                        )
                    const d = l[h]
                    for (const [g, b] of Object.entries(c)) {
                        if (b === null)
                            throw new Error(
                                `cannot decode field ${n.typeName}.${u.name} from JSON: map value null`
                            )
                        let w
                        switch (u.V.kind) {
                            case 'message':
                                w = u.V.T.fromJson(b, r)
                                break
                            case 'enum':
                                if (
                                    ((w = pe(u.V.T, b, r.ignoreUnknownFields)),
                                    w === void 0)
                                )
                                    continue
                                break
                            case 'scalar':
                                try {
                                    w = ee(u.V.T, b)
                                } catch (y) {
                                    let I = `cannot decode map value for field ${
                                        n.typeName
                                    }.${u.name} from JSON: "${this.debug(c)}"`
                                    throw (
                                        (y instanceof Error &&
                                            y.message.length > 0 &&
                                            (I += `: ${y.message}`),
                                        new Error(I))
                                    )
                                }
                                break
                        }
                        try {
                            d[
                                ee(
                                    u.K,
                                    u.K == f.BOOL
                                        ? g == 'true'
                                            ? !0
                                            : g == 'false'
                                            ? !1
                                            : g
                                        : g
                                ).toString()
                            ] = w
                        } catch (y) {
                            let I = `cannot decode map key for field ${
                                n.typeName
                            }.${u.name} from JSON: "${this.debug(c)}"`
                            throw (
                                (y instanceof Error &&
                                    y.message.length > 0 &&
                                    (I += `: ${y.message}`),
                                new Error(I))
                            )
                        }
                    }
                } else
                    switch (u.kind) {
                        case 'message':
                            const d = u.T
                            if (
                                c === null &&
                                d.typeName != 'google.protobuf.Value'
                            ) {
                                if (u.oneof)
                                    throw new Error(
                                        `cannot decode field ${n.typeName}.${u.name} from JSON: null is invalid for oneof field "${o}"`
                                    )
                                continue
                            }
                            const g = l[h] === void 0 ? new d() : fe(d, l[h])
                            l[h] = ct(d, g.fromJson(c, r))
                            break
                        case 'enum':
                            const b = pe(u.T, c, r.ignoreUnknownFields)
                            b !== void 0 && (l[h] = b)
                            break
                        case 'scalar':
                            try {
                                l[h] = ee(u.T, c)
                            } catch (w) {
                                let y = `cannot decode field ${n.typeName}.${
                                    u.name
                                } from JSON: "${this.debug(c)}"`
                                throw (
                                    (w instanceof Error &&
                                        w.message.length > 0 &&
                                        (y += `: ${w.message}`),
                                    new Error(y))
                                )
                            }
                            break
                    }
            }
            return i
        },
        writeMessage(n, s) {
            const r = n.getType(),
                i = {}
            let a
            try {
                for (const o of r.fields.byMember()) {
                    let c
                    if (o.kind == 'oneof') {
                        const u = n[o.localName]
                        if (u.value === void 0) continue
                        if (((a = o.findField(u.case)), !a))
                            throw 'oneof case not found: ' + u.case
                        c = e(a, u.value, s)
                    } else (a = o), (c = e(a, n[a.localName], s))
                    c !== void 0 &&
                        (i[s.useProtoFieldName ? a.name : a.jsonName] = c)
                }
            } catch (o) {
                const c = a
                        ? `cannot encode field ${r.typeName}.${a.name} to JSON`
                        : `cannot encode message ${r.typeName} to JSON`,
                    u = o instanceof Error ? o.message : String(o)
                throw new Error(c + (u.length > 0 ? `: ${u}` : ''))
            }
            return i
        },
        readScalar: ee,
        writeScalar: Ve,
        debug: ft,
    }
}
function ft(t) {
    if (t === null) return 'null'
    switch (typeof t) {
        case 'object':
            return Array.isArray(t) ? 'array' : 'object'
        case 'string':
            return t.length > 100 ? 'string' : `"${t.split('"').join('\\"')}"`
        default:
            return t.toString()
    }
}
function ee(t, e) {
    switch (t) {
        case f.DOUBLE:
        case f.FLOAT:
            if (e === null) return 0
            if (e === 'NaN') return Number.NaN
            if (e === 'Infinity') return Number.POSITIVE_INFINITY
            if (e === '-Infinity') return Number.NEGATIVE_INFINITY
            if (
                e === '' ||
                (typeof e == 'string' && e.trim().length !== e.length) ||
                (typeof e != 'string' && typeof e != 'number')
            )
                break
            const n = Number(e)
            if (Number.isNaN(n) || !Number.isFinite(n)) break
            return t == f.FLOAT && rt(n), n
        case f.INT32:
        case f.FIXED32:
        case f.SFIXED32:
        case f.SINT32:
        case f.UINT32:
            if (e === null) return 0
            let s
            if (
                (typeof e == 'number'
                    ? (s = e)
                    : typeof e == 'string' &&
                      e.length > 0 &&
                      e.trim().length === e.length &&
                      (s = Number(e)),
                s === void 0)
            )
                break
            return t == f.UINT32 ? ye(s) : ae(s), s
        case f.INT64:
        case f.SFIXED64:
        case f.SINT64:
            if (e === null) return B.zero
            if (typeof e != 'number' && typeof e != 'string') break
            return B.parse(e)
        case f.FIXED64:
        case f.UINT64:
            if (e === null) return B.zero
            if (typeof e != 'number' && typeof e != 'string') break
            return B.uParse(e)
        case f.BOOL:
            if (e === null) return !1
            if (typeof e != 'boolean') break
            return e
        case f.STRING:
            if (e === null) return ''
            if (typeof e != 'string') break
            try {
                encodeURIComponent(e)
            } catch {
                throw new Error('invalid UTF8')
            }
            return e
        case f.BYTES:
            if (e === null || e === '') return new Uint8Array(0)
            if (typeof e != 'string') break
            return ut.dec(e)
    }
    throw new Error()
}
function pe(t, e, n) {
    if (e === null) return 0
    switch (typeof e) {
        case 'number':
            if (Number.isInteger(e)) return e
            break
        case 'string':
            const s = t.findName(e)
            if (s || n) return s == null ? void 0 : s.no
            break
    }
    throw new Error(`cannot decode enum ${t.typeName} from JSON: ${ft(e)}`)
}
function zt(t, e, n, s) {
    var r
    if (e === void 0) return e
    if (e === 0 && !n) return
    if (s) return e
    if (t.typeName == 'google.protobuf.NullValue') return null
    const i = t.findNumber(e)
    return (r = i == null ? void 0 : i.name) !== null && r !== void 0 ? r : e
}
function Ve(t, e, n) {
    if (e !== void 0)
        switch (t) {
            case f.INT32:
            case f.SFIXED32:
            case f.SINT32:
            case f.FIXED32:
            case f.UINT32:
                return x(typeof e == 'number'), e != 0 || n ? e : void 0
            case f.FLOAT:
            case f.DOUBLE:
                return (
                    x(typeof e == 'number'),
                    Number.isNaN(e)
                        ? 'NaN'
                        : e === Number.POSITIVE_INFINITY
                        ? 'Infinity'
                        : e === Number.NEGATIVE_INFINITY
                        ? '-Infinity'
                        : e !== 0 || n
                        ? e
                        : void 0
                )
            case f.STRING:
                return x(typeof e == 'string'), e.length > 0 || n ? e : void 0
            case f.BOOL:
                return x(typeof e == 'boolean'), e || n ? e : void 0
            case f.UINT64:
            case f.FIXED64:
            case f.INT64:
            case f.SFIXED64:
            case f.SINT64:
                return (
                    x(
                        typeof e == 'bigint' ||
                            typeof e == 'string' ||
                            typeof e == 'number'
                    ),
                    n || e != 0 ? e.toString(10) : void 0
                )
            case f.BYTES:
                return (
                    x(e instanceof Uint8Array),
                    n || e.byteLength > 0 ? ut.enc(e) : void 0
                )
        }
}
function qt() {
    return Xt(
        (t, e) =>
            function (s, r, i) {
                if (s.kind == 'map') {
                    const a = {}
                    switch (s.V.kind) {
                        case 'scalar':
                            for (const [c, u] of Object.entries(r)) {
                                const h = e(s.V.T, u, !0)
                                x(h !== void 0), (a[c.toString()] = h)
                            }
                            break
                        case 'message':
                            for (const [c, u] of Object.entries(r))
                                a[c.toString()] = u.toJson(i)
                            break
                        case 'enum':
                            const o = s.V.T
                            for (const [c, u] of Object.entries(r)) {
                                x(u === void 0 || typeof u == 'number')
                                const h = t(o, u, !0, i.enumAsInteger)
                                x(h !== void 0), (a[c.toString()] = h)
                            }
                            break
                    }
                    return i.emitDefaultValues || Object.keys(a).length > 0
                        ? a
                        : void 0
                } else if (s.repeated) {
                    const a = []
                    switch (s.kind) {
                        case 'scalar':
                            for (let o = 0; o < r.length; o++)
                                a.push(e(s.T, r[o], !0))
                            break
                        case 'enum':
                            for (let o = 0; o < r.length; o++)
                                a.push(t(s.T, r[o], !0, i.enumAsInteger))
                            break
                        case 'message':
                            for (let o = 0; o < r.length; o++)
                                a.push(fe(s.T, r[o]).toJson(i))
                            break
                    }
                    return i.emitDefaultValues || a.length > 0 ? a : void 0
                } else
                    switch (s.kind) {
                        case 'scalar':
                            return e(
                                s.T,
                                r,
                                !!s.oneof || s.opt || i.emitDefaultValues
                            )
                        case 'enum':
                            return t(
                                s.T,
                                r,
                                !!s.oneof || s.opt || i.emitDefaultValues,
                                i.enumAsInteger
                            )
                        case 'message':
                            return r !== void 0 ? fe(s.T, r).toJson(i) : void 0
                    }
            }
    )
}
function Gt() {
    return {
        setEnumType: it,
        initPartial(t, e) {
            if (t === void 0) return
            const n = e.getType()
            for (const s of n.fields.byMember()) {
                const r = s.localName,
                    i = e,
                    a = t
                if (a[r] !== void 0)
                    switch (s.kind) {
                        case 'oneof':
                            const o = a[r].case
                            if (o === void 0) continue
                            const c = s.findField(o)
                            let u = a[r].value
                            c &&
                                c.kind == 'message' &&
                                !(u instanceof c.T) &&
                                (u = new c.T(u)),
                                (i[r] = { case: o, value: u })
                            break
                        case 'scalar':
                        case 'enum':
                            i[r] = a[r]
                            break
                        case 'map':
                            switch (s.V.kind) {
                                case 'scalar':
                                case 'enum':
                                    Object.assign(i[r], a[r])
                                    break
                                case 'message':
                                    const l = s.V.T
                                    for (const d of Object.keys(a[r])) {
                                        let g = a[r][d]
                                        l.fieldWrapper || (g = new l(g)),
                                            (i[r][d] = g)
                                    }
                                    break
                            }
                            break
                        case 'message':
                            const h = s.T
                            if (s.repeated)
                                i[r] = a[r].map((l) =>
                                    l instanceof h ? l : new h(l)
                                )
                            else if (a[r] !== void 0) {
                                const l = a[r]
                                h.fieldWrapper
                                    ? (i[r] = l)
                                    : (i[r] = l instanceof h ? l : new h(l))
                            }
                            break
                    }
            }
        },
        equals(t, e, n) {
            return e === n
                ? !0
                : !e || !n
                ? !1
                : t.fields.byMember().every((s) => {
                      const r = e[s.localName],
                          i = n[s.localName]
                      if (s.repeated) {
                          if (r.length !== i.length) return !1
                          switch (s.kind) {
                              case 'message':
                                  return r.every((a, o) => s.T.equals(a, i[o]))
                              case 'scalar':
                                  return r.every((a, o) => X(s.T, a, i[o]))
                              case 'enum':
                                  return r.every((a, o) => X(f.INT32, a, i[o]))
                          }
                          throw new Error(`repeated cannot contain ${s.kind}`)
                      }
                      switch (s.kind) {
                          case 'message':
                              return s.T.equals(r, i)
                          case 'enum':
                              return X(f.INT32, r, i)
                          case 'scalar':
                              return X(s.T, r, i)
                          case 'oneof':
                              if (r.case !== i.case) return !1
                              const a = r.case,
                                  o = s.findField(a)
                              if (o === void 0) return !0
                              switch (o.kind) {
                                  case 'message':
                                      return o.T.equals(r[a], i[a])
                                  case 'enum':
                                      return X(f.INT32, r, i)
                                  case 'scalar':
                                      return X(o.T, r, i)
                              }
                              throw new Error(`oneof cannot contain ${o.kind}`)
                          case 'map':
                              const c = Object.keys(r)
                              if (c.some((u) => i[u] === void 0)) return !1
                              switch (s.V.kind) {
                                  case 'message':
                                      const u = s.V.T
                                      return c.every((l) =>
                                          u.equals(r[l], i[l])
                                      )
                                  case 'enum':
                                      return c.every((l) =>
                                          X(f.INT32, r[l], i[l])
                                      )
                                  case 'scalar':
                                      const h = s.V.T
                                      return c.every((l) => X(h, r[l], i[l]))
                              }
                              break
                      }
                  })
        },
        clone(t) {
            const e = t.getType(),
                n = new e(),
                s = n
            for (const r of e.fields.byMember()) {
                const i = t[r.localName]
                let a
                if (r.repeated) a = i.map((o) => se(r, o))
                else if (r.kind == 'map') {
                    a = s[r.localName]
                    for (const [o, c] of Object.entries(i)) a[o] = se(r.V, c)
                } else if (r.kind == 'oneof') {
                    const o = r.findField(i.case)
                    a = o
                        ? { case: i.case, value: se(o, i.value) }
                        : { case: void 0 }
                } else a = se(r, i)
                s[r.localName] = a
            }
            return n
        },
    }
}
function se(t, e) {
    if (e === void 0) return e
    switch (t.kind) {
        case 'enum':
            return e
        case 'scalar':
            if (t.T === f.BYTES) {
                const n = new Uint8Array(e.byteLength)
                return n.set(e), n
            }
            return e
        case 'message':
            return t.T.fieldWrapper
                ? t.T.fieldWrapper.unwrapField(
                      t.T.fieldWrapper.wrapField(e).clone()
                  )
                : e.clone()
    }
}
class Ht {
    constructor(e, n) {
        ;(this._fields = e), (this._normalizer = n)
    }
    findJsonName(e) {
        if (!this.jsonNames) {
            const n = {}
            for (const s of this.list()) n[s.jsonName] = n[s.name] = s
            this.jsonNames = n
        }
        return this.jsonNames[e]
    }
    find(e) {
        if (!this.numbers) {
            const n = {}
            for (const s of this.list()) n[s.no] = s
            this.numbers = n
        }
        return this.numbers[e]
    }
    list() {
        return this.all || (this.all = this._normalizer(this._fields)), this.all
    }
    byNumber() {
        return (
            this.numbersAsc ||
                (this.numbersAsc = this.list()
                    .concat()
                    .sort((e, n) => e.no - n.no)),
            this.numbersAsc
        )
    }
    byMember() {
        if (!this.members) {
            this.members = []
            const e = this.members
            let n
            for (const s of this.list())
                s.oneof
                    ? s.oneof !== n && ((n = s.oneof), e.push(n))
                    : e.push(s)
        }
        return this.members
    }
}
function Yt(t) {
    return dt(t)
}
function lt(t, e) {
    const n = dt(t)
    return e ? n : jt[n] ? n + Wt : n
}
function Ct(t) {
    return lt(t, !1)
}
function dt(t) {
    let e = !1
    const n = []
    for (let s = 0; s < t.length; s++) {
        let r = t.charAt(s)
        switch (r) {
            case '_':
                e = !0
                break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                n.push(r), (e = !1)
                break
            default:
                e && ((e = !1), (r = r.toUpperCase())), n.push(r)
                break
        }
    }
    return n.join('')
}
const Wt = '$',
    jt = {
        constructor: !0,
        toString: !0,
        toJSON: !0,
        valueOf: !0,
        getType: !0,
        clone: !0,
        equals: !0,
        fromBinary: !0,
        fromJson: !0,
        fromJsonString: !0,
        toBinary: !0,
        toJson: !0,
        toJsonString: !0,
        toObject: !0,
    }
class Kt {
    constructor(e) {
        ;(this.kind = 'oneof'),
            (this.repeated = !1),
            (this.packed = !1),
            (this.opt = !1),
            (this.default = void 0),
            (this.fields = []),
            (this.name = e),
            (this.localName = Ct(e))
    }
    addField(e) {
        x(e.oneof === this, `field ${e.name} not one of ${this.name}`),
            this.fields.push(e)
    }
    findField(e) {
        if (!this._lookup) {
            this._lookup = Object.create(null)
            for (let n = 0; n < this.fields.length; n++)
                this._lookup[this.fields[n].localName] = this.fields[n]
        }
        return this._lookup[e]
    }
}
const J = St(
    'proto3',
    qt(),
    Mt(),
    Object.assign(Object.assign({}, Gt()), {
        newFieldList(t) {
            return new Ht(t, Zt)
        },
        initFields(t) {
            for (const e of t.getType().fields.byMember()) {
                if (e.opt) continue
                const n = e.localName,
                    s = t
                if (e.repeated) {
                    s[n] = []
                    continue
                }
                switch (e.kind) {
                    case 'oneof':
                        s[n] = { case: void 0 }
                        break
                    case 'enum':
                        s[n] = 0
                        break
                    case 'map':
                        s[n] = {}
                        break
                    case 'scalar':
                        s[n] = we(e.T)
                        break
                }
            }
        },
    })
)
function Zt(t) {
    var e, n, s
    const r = []
    let i
    for (const a of typeof t == 'function' ? t() : t) {
        const o = a
        if (
            ((o.localName = lt(a.name, a.oneof !== void 0)),
            (o.jsonName =
                (e = a.jsonName) !== null && e !== void 0 ? e : Yt(a.name)),
            (o.repeated = (n = a.repeated) !== null && n !== void 0 ? n : !1),
            (o.packed =
                (s = a.packed) !== null && s !== void 0
                    ? s
                    : a.kind == 'enum' ||
                      (a.kind == 'scalar' &&
                          a.T != f.BYTES &&
                          a.T != f.STRING)),
            a.oneof !== void 0)
        ) {
            const c = typeof a.oneof == 'string' ? a.oneof : a.oneof.name
            ;(!i || i.name != c) && (i = new Kt(c)),
                (o.oneof = i),
                i.addField(o)
        }
        r.push(o)
    }
    return r
}
var P
;(function (t) {
    ;(t[(t.Unary = 0)] = 'Unary'),
        (t[(t.ServerStreaming = 1)] = 'ServerStreaming'),
        (t[(t.ClientStreaming = 2)] = 'ClientStreaming'),
        (t[(t.BiDiStreaming = 3)] = 'BiDiStreaming')
})(P || (P = {}))
var Xe
;(function (t) {
    ;(t[(t.NoSideEffects = 1)] = 'NoSideEffects'),
        (t[(t.Idempotent = 2)] = 'Idempotent')
})(Xe || (Xe = {}))
class L extends ot {
    constructor(e) {
        super(),
            (this.typeUrl = ''),
            (this.value = new Uint8Array(0)),
            J.util.initPartial(e, this)
    }
    toJson(e) {
        var n
        if (this.typeUrl === '') return {}
        const s = this.typeUrlToName(this.typeUrl),
            r =
                (n = e == null ? void 0 : e.typeRegistry) === null ||
                n === void 0
                    ? void 0
                    : n.findMessage(s)
        if (!r)
            throw new Error(
                `cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`
            )
        let a = r.fromBinary(this.value).toJson(e)
        return (
            (s.startsWith('google.protobuf.') ||
                a === null ||
                Array.isArray(a) ||
                typeof a != 'object') &&
                (a = { value: a }),
            (a['@type'] = this.typeUrl),
            a
        )
    }
    fromJson(e, n) {
        var s
        if (e === null || Array.isArray(e) || typeof e != 'object')
            throw new Error(
                `cannot decode message google.protobuf.Any from JSON: expected object but got ${
                    e === null ? 'null' : Array.isArray(e) ? 'array' : typeof e
                }`
            )
        const r = e['@type']
        if (typeof r != 'string' || r == '')
            throw new Error(
                'cannot decode message google.protobuf.Any from JSON: "@type" is empty'
            )
        const i = this.typeUrlToName(r),
            a =
                (s = n == null ? void 0 : n.typeRegistry) === null ||
                s === void 0
                    ? void 0
                    : s.findMessage(i)
        if (!a)
            throw new Error(
                `cannot decode message google.protobuf.Any from JSON: ${r} is not in the type registry`
            )
        let o
        if (
            i.startsWith('google.protobuf.') &&
            Object.prototype.hasOwnProperty.call(e, 'value')
        )
            o = a.fromJson(e.value, n)
        else {
            const c = Object.assign({}, e)
            delete c['@type'], (o = a.fromJson(c, n))
        }
        return this.packFrom(o), this
    }
    packFrom(e) {
        ;(this.value = e.toBinary()),
            (this.typeUrl = this.typeNameToUrl(e.getType().typeName))
    }
    unpackTo(e) {
        return this.is(e.getType()) ? (e.fromBinary(this.value), !0) : !1
    }
    is(e) {
        return this.typeUrl === this.typeNameToUrl(e.typeName)
    }
    typeNameToUrl(e) {
        return `type.googleapis.com/${e}`
    }
    typeUrlToName(e) {
        if (!e.length) throw new Error(`invalid type url: ${e}`)
        const n = e.lastIndexOf('/'),
            s = n > 0 ? e.substring(n + 1) : e
        if (!s.length) throw new Error(`invalid type url: ${e}`)
        return s
    }
    static pack(e) {
        const n = new L()
        return n.packFrom(e), n
    }
    static fromBinary(e, n) {
        return new L().fromBinary(e, n)
    }
    static fromJson(e, n) {
        return new L().fromJson(e, n)
    }
    static fromJsonString(e, n) {
        return new L().fromJsonString(e, n)
    }
    static equals(e, n) {
        return J.util.equals(L, e, n)
    }
}
L.runtime = J
L.typeName = 'google.protobuf.Any'
L.fields = J.util.newFieldList(() => [
    { no: 1, name: 'type_url', kind: 'scalar', T: 9 },
    { no: 2, name: 'value', kind: 'scalar', T: 12 },
])
var N
;(function (t) {
    ;(t[(t.Canceled = 1)] = 'Canceled'),
        (t[(t.Unknown = 2)] = 'Unknown'),
        (t[(t.InvalidArgument = 3)] = 'InvalidArgument'),
        (t[(t.DeadlineExceeded = 4)] = 'DeadlineExceeded'),
        (t[(t.NotFound = 5)] = 'NotFound'),
        (t[(t.AlreadyExists = 6)] = 'AlreadyExists'),
        (t[(t.PermissionDenied = 7)] = 'PermissionDenied'),
        (t[(t.ResourceExhausted = 8)] = 'ResourceExhausted'),
        (t[(t.FailedPrecondition = 9)] = 'FailedPrecondition'),
        (t[(t.Aborted = 10)] = 'Aborted'),
        (t[(t.OutOfRange = 11)] = 'OutOfRange'),
        (t[(t.Unimplemented = 12)] = 'Unimplemented'),
        (t[(t.Internal = 13)] = 'Internal'),
        (t[(t.Unavailable = 14)] = 'Unavailable'),
        (t[(t.DataLoss = 15)] = 'DataLoss'),
        (t[(t.Unauthenticated = 16)] = 'Unauthenticated')
})(N || (N = {}))
function ze(t) {
    switch (t) {
        case 400:
            return N.InvalidArgument
        case 401:
            return N.Unauthenticated
        case 403:
            return N.PermissionDenied
        case 404:
            return N.Unimplemented
        case 408:
            return N.DeadlineExceeded
        case 409:
            return N.Aborted
        case 412:
            return N.FailedPrecondition
        case 413:
            return N.ResourceExhausted
        case 415:
            return N.Internal
        case 429:
            return N.Unavailable
        case 431:
            return N.ResourceExhausted
        case 502:
            return N.Unavailable
        case 503:
            return N.Unavailable
        case 504:
            return N.Unavailable
        default:
            return N.Unknown
    }
}
function Qt(t) {
    if (!ie) {
        ie = {}
        for (const e of Object.values(N))
            typeof e != 'string' && (ie[Ne(e)] = e)
    }
    return ie[t]
}
function Ne(t) {
    const e = N[t]
    return typeof e != 'string'
        ? t.toString()
        : e[0].toLowerCase() +
              e.substring(1).replace(/[A-Z]/g, (n) => '_' + n.toLowerCase())
}
let ie
function en(t, e) {
    const n = {}
    for (const [s, r] of Object.entries(t.methods)) {
        const i = e(
            Object.assign(Object.assign({}, r), { localName: s, service: t })
        )
        i != null && (n[s] = i)
    }
    return n
}
class $ extends Error {
    constructor(e, n = N.Unknown, s, r) {
        super(tn(n, e)),
            (this.name = 'ConnectError'),
            Object.setPrototypeOf(this, new.target.prototype),
            (this.rawMessage = e),
            (this.code = n),
            (this.details = s != null ? s : []),
            (this.metadata = new Headers(r)),
            (this.rawDetails = [])
    }
}
function tn(t, e) {
    return e.length ? `[${Ne(t)}] ${e}` : `[${Ne(t)}]`
}
function Te(t, e) {
    if (
        typeof t != 'object' ||
        t == null ||
        Array.isArray(t) ||
        !('code' in t) ||
        typeof t.code != 'string'
    )
        throw R(t)
    const n = Qt(t.code)
    if (!n) throw R(t.code, '.code')
    const s = t.message
    if (s != null && typeof s != 'string') throw R(t.code, '.message')
    const r = new $(
        s != null ? s : '',
        n,
        void 0,
        e == null ? void 0 : e.metadata
    )
    if ('details' in t && Array.isArray(t.details))
        for (const i of t.details) {
            let a
            try {
                a = L.fromJson(i, e)
            } catch {
                r.rawDetails.push(i)
                continue
            }
            const o = a.typeUrl.substring(a.typeUrl.lastIndexOf('/') + 1)
            if (!(e != null && e.typeRegistry)) {
                r.rawDetails.push(i)
                continue
            }
            const c = e.typeRegistry.findMessage(o)
            if (c) {
                const u = new c()
                a.unpackTo(u) && r.details.push(u)
            }
        }
    return r
}
function qe(t) {
    return t instanceof $
        ? t
        : t instanceof Error
        ? t.name == 'AbortError'
            ? new $(t.message, N.Canceled)
            : new $(t.message)
        : new $(String(t), N.Internal)
}
function R(t, e, n) {
    let s
    return (
        n == null || n
            ? (s = J.json.debug(t))
            : ((e = ''), (s = t instanceof Error ? t.message : String(t))),
        new $(
            `cannot decode ConnectError${e != null ? e : ''} from JSON: ${s}`,
            N.Internal
        )
    )
}
function nn(t, e) {
    return en(t, (n) => {
        switch (n.kind) {
            case P.Unary:
                return rn(e, t, n)
            case P.ServerStreaming:
                return sn(e, t, n)
            default:
                return null
        }
    })
}
function rn(t, e, n) {
    return async function (s, r) {
        var i, a
        const o = await t.unary(
            e,
            n,
            r == null ? void 0 : r.signal,
            r == null ? void 0 : r.timeoutMs,
            r == null ? void 0 : r.headers,
            s
        )
        return (
            (i = r == null ? void 0 : r.onHeader) === null ||
                i === void 0 ||
                i.call(r, o.header),
            (a = r == null ? void 0 : r.onTrailer) === null ||
                a === void 0 ||
                a.call(r, o.trailer),
            o.message
        )
    }
}
function sn(t, e, n) {
    return function (s, r) {
        let i
        return {
            [Symbol.asyncIterator]() {
                return {
                    async next() {
                        var a, o
                        i ||
                            ((i = await t.serverStream(
                                e,
                                n,
                                r == null ? void 0 : r.signal,
                                r == null ? void 0 : r.timeoutMs,
                                r == null ? void 0 : r.headers,
                                s
                            )),
                            (a = r == null ? void 0 : r.onHeader) === null ||
                                a === void 0 ||
                                a.call(r, i.header))
                        const c = await i.read()
                        return c.done
                            ? ((o = r == null ? void 0 : r.onTrailer) ===
                                  null ||
                                  o === void 0 ||
                                  o.call(r, i.trailer),
                              { done: !0, value: void 0 })
                            : { done: !1, value: c.value }
                    },
                }
            },
        }
    }
}
function an(t, e, n) {
    return n && (e = ht(e, n)), e(t)
}
function on(t, e, n) {
    return n && (e = ht(e, n)), e(t)
}
function ht(t, e) {
    return e
        .concat()
        .reverse()
        .reduce((n, s) => s(n), t)
}
function cn(...t) {
    const e = new ArrayBuffer(t.reduce((s, r) => s + r.data.length + 5, 0))
    let n = 0
    for (const s of t) n += un(s, e, n)
    return new Uint8Array(e)
}
function un(t, e, n) {
    const s = t.data.length + 5,
        r = new Uint8Array(e, n, s)
    r[0] = t.flags
    for (let i = t.data.length, a = 4; a > 0; a--) (r[a] = i % 256), (i >>>= 8)
    return r.set(t.data, 5), s
}
function fn(t) {
    let e,
        n = new Uint8Array(0)
    function s(r) {
        const i = new Uint8Array(n.length + r.length)
        i.set(n), i.set(r, n.length), (n = i)
    }
    return new ReadableStream({
        start() {
            e = t.getReader()
        },
        async pull(r) {
            let i
            for (;;) {
                if (i === void 0 && n.byteLength >= 5) {
                    let c = 0
                    for (let u = 1; u < 5; u++) c = (c << 8) + n[u]
                    i = { flags: n[0], length: c }
                }
                const o = await e.read()
                if (
                    o.done ||
                    (s(o.value), i !== void 0 && n.byteLength >= i.length + 5)
                )
                    break
            }
            if (i === void 0) {
                if (n.byteLength == 0) {
                    r.close()
                    return
                }
                r.error(new $('premature end of stream', N.DataLoss))
                return
            }
            const a = n.subarray(5, 5 + i.length)
            ;(n = n.subarray(5 + i.length)),
                r.enqueue({ flags: i.flags, data: a })
        },
    })
}
function Ge(...t) {
    const e = new Headers()
    for (const n of t)
        n.forEach((s, r) => {
            e.append(r, s)
        })
    return e
}
function ln(t) {
    var e
    const n = (e = t.useBinaryFormat) !== null && e !== void 0 ? e : !1
    return {
        async unary(s, r, i, a, o, c) {
            var u
            try {
                return await an(
                    {
                        stream: !1,
                        service: s,
                        method: r,
                        url: `${t.baseUrl}/${s.typeName}/${r.name}`,
                        init: {
                            method: 'POST',
                            credentials:
                                (u = t.credentials) !== null && u !== void 0
                                    ? u
                                    : 'same-origin',
                            redirect: 'error',
                            mode: 'cors',
                        },
                        header: Ye(o, a, r.kind, n),
                        message: c instanceof r.I ? c : new r.I(c),
                        signal: i != null ? i : new AbortController().signal,
                    },
                    async (h) => {
                        var l
                        const d = await fetch(
                                h.url,
                                Object.assign(Object.assign({}, h.init), {
                                    headers: h.header,
                                    signal: h.signal,
                                    body: He(
                                        h.message,
                                        r.kind,
                                        n,
                                        t.jsonOptions
                                    ),
                                })
                            ),
                            g =
                                (l = d.headers.get('Content-Type')) !== null &&
                                l !== void 0
                                    ? l
                                    : ''
                        if (d.status != 200)
                            throw g == 'application/json'
                                ? Te(await d.json(), {
                                      typeRegistry: t.errorDetailRegistry,
                                      metadata: Ge(...be(d.headers)),
                                  })
                                : new $(
                                      `HTTP ${d.status} ${d.statusText}`,
                                      ze(d.status)
                                  )
                        Ce(g, !1, n)
                        const [b, w] = be(d.headers)
                        return {
                            stream: !1,
                            service: s,
                            method: r,
                            header: b,
                            message: n
                                ? r.O.fromBinary(
                                      new Uint8Array(await d.arrayBuffer()),
                                      t.binaryOptions
                                  )
                                : r.O.fromJson(await d.json(), t.jsonOptions),
                            trailer: w,
                        }
                    },
                    t.interceptors
                )
            } catch (h) {
                throw qe(h)
            }
        },
        async serverStream(s, r, i, a, o, c) {
            var u
            try {
                return await on(
                    {
                        stream: !1,
                        service: s,
                        method: r,
                        url: `${t.baseUrl}/${s.typeName}/${r.name}`,
                        init: {
                            method: 'POST',
                            credentials:
                                (u = t.credentials) !== null && u !== void 0
                                    ? u
                                    : 'same-origin',
                            redirect: 'error',
                            mode: 'cors',
                        },
                        header: Ye(o, a, r.kind, n),
                        message: c instanceof r.I ? c : new r.I(c),
                        signal: i != null ? i : new AbortController().signal,
                    },
                    async (h) => {
                        var l
                        const d = await fetch(
                                h.url,
                                Object.assign(Object.assign({}, h.init), {
                                    headers: h.header,
                                    signal: h.signal,
                                    body: He(
                                        h.message,
                                        r.kind,
                                        n,
                                        t.jsonOptions
                                    ),
                                })
                            ),
                            g =
                                (l = d.headers.get('Content-Type')) !== null &&
                                l !== void 0
                                    ? l
                                    : ''
                        if (d.status != 200)
                            throw g == 'application/json'
                                ? Te(await d.json(), {
                                      typeRegistry: t.errorDetailRegistry,
                                      metadata: Ge(...be(d.headers)),
                                  })
                                : new $(
                                      `HTTP ${d.status} ${d.statusText}`,
                                      ze(d.status)
                                  )
                        if ((Ce(g, !0, n), d.body === null))
                            throw 'missing response body'
                        const b = fn(d.body).getReader()
                        let w = !1
                        return {
                            stream: !0,
                            service: s,
                            method: r,
                            header: d.headers,
                            trailer: new Headers(),
                            async read() {
                                const y = await b.read()
                                if (y.done) {
                                    if (!w)
                                        throw new $('missing EndStreamResponse')
                                    return { done: !0, value: void 0 }
                                }
                                if ((y.value.flags & Ie) === Ie) {
                                    w = !0
                                    const I = Ee.fromJsonString(
                                        new TextDecoder().decode(y.value.data),
                                        { typeRegistry: t.errorDetailRegistry }
                                    )
                                    if (
                                        (I.metadata.forEach((Q, Y) =>
                                            this.trailer.append(Y, Q)
                                        ),
                                        I.error)
                                    )
                                        throw I.error
                                    return { done: !0, value: void 0 }
                                }
                                return {
                                    done: !1,
                                    value: n
                                        ? r.O.fromBinary(
                                              y.value.data,
                                              t.binaryOptions
                                          )
                                        : r.O.fromJsonString(
                                              new TextDecoder().decode(
                                                  y.value.data
                                              ),
                                              t.jsonOptions
                                          ),
                                }
                            },
                        }
                    },
                    t.interceptors
                )
            } catch (h) {
                throw qe(h)
            }
        },
    }
}
function He(t, e, n, s) {
    const r = n ? t.toBinary() : t.toJsonString(s)
    if (e == P.Unary) return r
    const i = typeof r == 'string' ? new TextEncoder().encode(r) : r
    return cn({ data: i, flags: 0 }, { data: new Uint8Array(0), flags: Ie })
}
function Ye(t, e, n, s) {
    const r = new Headers(t)
    let i = 'application/'
    return (
        n != P.Unary && (i += 'connect+'),
        (i += s ? 'proto' : 'json'),
        r.set('Content-Type', i),
        e !== void 0 && r.set('Connect-Timeout-Ms', `${e}`),
        r
    )
}
function Ce(t, e, n) {
    const s =
            t == null
                ? void 0
                : t.match(/^application\/(connect\+)?(json|proto)$/),
        r = s && s[2] == 'proto'
    if (!s || e !== !!s[1] || n !== r)
        throw new $(`unexpected response content type ${String(t)}`, N.Internal)
}
function be(t) {
    const e = new Headers(),
        n = new Headers()
    return (
        t.forEach((s, r) => {
            r.toLowerCase().startsWith('trailer-')
                ? n.set(r.substring(8), s)
                : e.set(r, s)
        }),
        [e, n]
    )
}
const Ie = 2
class Ee {
    constructor(e, n) {
        ;(this.metadata = e), (this.error = n)
    }
    static fromJsonString(e, n) {
        let s
        try {
            s = JSON.parse(e)
        } catch (r) {
            throw R(r, '', !1)
        }
        return this.fromJson(s, n)
    }
    static fromJson(e, n) {
        if (typeof e != 'object' || e == null || Array.isArray(e)) throw R(e)
        const s = new Headers()
        if ('metadata' in e) {
            if (
                typeof e.metadata != 'object' ||
                e.metadata == null ||
                Array.isArray(e.metadata)
            )
                throw R(e, '.metadata')
            for (const [i, a] of Object.entries(e.metadata)) {
                if (!Array.isArray(a) || a.some((o) => typeof o != 'string'))
                    throw R(a, `.metadata["${i}"]`)
                for (const o of a) s.append(i, o)
            }
        }
        let r
        if ('error' in e) {
            if (
                typeof e.error != 'object' ||
                e.error == null ||
                Array.isArray(e.error)
            )
                throw R(e, '.error')
            if (Object.keys(e.error).length > 0)
                try {
                    r = Te(
                        e.error,
                        Object.assign(Object.assign({}, n), { metadata: s })
                    )
                } catch (i) {
                    throw R(i, '.error', !1)
                }
        }
        return new Ee(s, r)
    }
}
const dn = J.makeMessageType('buf.connect.demo.eliza.v1.SayRequest', () => [
        { no: 1, name: 'sentence', kind: 'scalar', T: 9 },
    ]),
    hn = J.makeMessageType('buf.connect.demo.eliza.v1.SayResponse', () => [
        { no: 1, name: 'sentence', kind: 'scalar', T: 9 },
    ]),
    mn = J.makeMessageType('buf.connect.demo.eliza.v1.ConverseRequest', () => [
        { no: 1, name: 'sentence', kind: 'scalar', T: 9 },
    ]),
    gn = J.makeMessageType('buf.connect.demo.eliza.v1.ConverseResponse', () => [
        { no: 1, name: 'sentence', kind: 'scalar', T: 9 },
    ]),
    mt = J.makeMessageType('buf.connect.demo.eliza.v1.IntroduceRequest', () => [
        { no: 1, name: 'name', kind: 'scalar', T: 9 },
    ]),
    pn = J.makeMessageType(
        'buf.connect.demo.eliza.v1.IntroduceResponse',
        () => [{ no: 1, name: 'sentence', kind: 'scalar', T: 9 }]
    ),
    bn = {
        typeName: 'buf.connect.demo.eliza.v1.ElizaService',
        methods: {
            say: { name: 'Say', I: dn, O: hn, kind: P.Unary },
            converse: { name: 'Converse', I: mn, O: gn, kind: P.BiDiStreaming },
            introduce: {
                name: 'Introduce',
                I: mt,
                O: pn,
                kind: P.ServerStreaming,
            },
        },
    }
function We(t, e, n) {
    const s = t.slice()
    return (s[10] = e[n]), s
}
function je(t, e, n) {
    const s = t.slice()
    return (s[13] = e[n]), s
}
function Ke(t) {
    let e,
        n = t[13] + '',
        s
    return {
        c() {
            ;(e = F('p')), (s = K(n)), this.h()
        },
        l(r) {
            e = U(r, 'P', { class: !0 })
            var i = A(e)
            ;(s = Z(i, n)), i.forEach(v), this.h()
        },
        h() {
            _(e, 'class', 'resp-text svelte-1089cum')
        },
        m(r, i) {
            le(r, e, i), k(e, s)
        },
        p(r, i) {
            i & 4 && n !== (n = r[13] + '') && tt(s, n)
        },
        d(r) {
            r && v(e)
        },
    }
}
function Ze(t) {
    let e, n, s, r, i, a, o
    return {
        c() {
            ;(e = F('div')),
                (n = F('input')),
                (s = G()),
                (r = F('button')),
                (i = K('Say')),
                this.h()
        },
        l(c) {
            e = U(c, 'DIV', {})
            var u = A(e)
            ;(n = U(u, 'INPUT', { type: !0, class: !0 })),
                (s = H(u)),
                (r = U(u, 'BUTTON', {}))
            var h = A(r)
            ;(i = Z(h, 'Say')), h.forEach(v), u.forEach(v), this.h()
        },
        h() {
            _(n, 'type', 'text'), _(n, 'class', 'text-input svelte-1089cum')
        },
        m(c, u) {
            le(c, e, u),
                k(e, n),
                ce(n, t[1]),
                k(e, s),
                k(e, r),
                k(r, i),
                a ||
                    ((o = [ue(n, 'input', t[8]), ue(r, 'click', t[5])]),
                    (a = !0))
        },
        p(c, u) {
            u & 2 && n.value !== c[1] && ce(n, c[1])
        },
        d(c) {
            c && v(e), (a = !1), nt(o)
        },
    }
}
function Qe(t) {
    let e,
        n = t[10] + '',
        s
    return {
        c() {
            ;(e = F('p')), (s = K(n)), this.h()
        },
        l(r) {
            e = U(r, 'P', { class: !0 })
            var i = A(e)
            ;(s = Z(i, n)), i.forEach(v), this.h()
        },
        h() {
            _(e, 'class', 'resp-text svelte-1089cum')
        },
        m(r, i) {
            le(r, e, i), k(e, s)
        },
        p(r, i) {
            i & 8 && n !== (n = r[10] + '') && tt(s, n)
        },
        d(r) {
            r && v(e)
        },
    }
}
function yn(t) {
    let e,
        n,
        s,
        r,
        i,
        a,
        o,
        c,
        u,
        h,
        l,
        d,
        g,
        b,
        w,
        y,
        I,
        Q,
        Y,
        z,
        he,
        Oe,
        C = t[2],
        E = []
    for (let p = 0; p < C.length; p += 1) E[p] = Ke(je(t, C, p))
    let O = t[4] && Ze(t),
        W = t[3],
        S = []
    for (let p = 0; p < W.length; p += 1) S[p] = Qe(We(t, W, p))
    return {
        c() {
            ;(e = F('div')),
                (n = F('header')),
                (s = F('div')),
                (r = F('div')),
                (i = F('h1')),
                (a = K('Eliza')),
                (o = G()),
                (c = F('p')),
                (u = K('What is your name?')),
                (h = G()),
                (l = F('div')),
                (d = F('input')),
                (g = G()),
                (b = F('button')),
                (w = K('Introduce')),
                (y = G()),
                (I = F('div'))
            for (let p = 0; p < E.length; p += 1) E[p].c()
            ;(Q = G()), O && O.c(), (Y = G()), (z = F('div'))
            for (let p = 0; p < S.length; p += 1) S[p].c()
            this.h()
        },
        l(p) {
            e = U(p, 'DIV', { class: !0 })
            var D = A(e)
            n = U(D, 'HEADER', { class: !0 })
            var m = A(n)
            s = U(m, 'DIV', { class: !0 })
            var V = A(s)
            r = U(V, 'DIV', {})
            var Se = A(r)
            i = U(Se, 'H1', { class: !0 })
            var Fe = A(i)
            ;(a = Z(Fe, 'Eliza')),
                Fe.forEach(v),
                Se.forEach(v),
                V.forEach(v),
                (o = H(m)),
                (c = U(m, 'P', { class: !0 }))
            var Ue = A(c)
            ;(u = Z(Ue, 'What is your name?')),
                Ue.forEach(v),
                (h = H(m)),
                (l = U(m, 'DIV', {}))
            var re = A(l)
            ;(d = U(re, 'INPUT', { type: !0, class: !0 })),
                (g = H(re)),
                (b = U(re, 'BUTTON', {}))
            var Be = A(b)
            ;(w = Z(Be, 'Introduce')),
                Be.forEach(v),
                re.forEach(v),
                (y = H(m)),
                (I = U(m, 'DIV', { class: !0 }))
            var Ae = A(I)
            for (let q = 0; q < E.length; q += 1) E[q].l(Ae)
            Ae.forEach(v),
                (Q = H(m)),
                O && O.l(m),
                (Y = H(m)),
                (z = U(m, 'DIV', { class: !0 }))
            var _e = A(z)
            for (let q = 0; q < S.length; q += 1) S[q].l(_e)
            _e.forEach(v), m.forEach(v), D.forEach(v), this.h()
        },
        h() {
            _(i, 'class', 'svelte-1089cum'),
                _(s, 'class', 'app-title svelte-1089cum'),
                _(c, 'class', 'prompt-text svelte-1089cum'),
                _(d, 'type', 'text'),
                _(d, 'class', 'text-input svelte-1089cum'),
                _(I, 'class', 'intro-container svelte-1089cum'),
                _(z, 'class', 'intro-container svelte-1089cum'),
                _(n, 'class', 'app-header svelte-1089cum'),
                _(e, 'class', 'app svelte-1089cum')
        },
        m(p, D) {
            le(p, e, D),
                k(e, n),
                k(n, s),
                k(s, r),
                k(r, i),
                k(i, a),
                k(n, o),
                k(n, c),
                k(c, u),
                k(n, h),
                k(n, l),
                k(l, d),
                ce(d, t[0]),
                k(l, g),
                k(l, b),
                k(b, w),
                k(n, y),
                k(n, I)
            for (let m = 0; m < E.length; m += 1) E[m].m(I, null)
            k(n, Q), O && O.m(n, null), k(n, Y), k(n, z)
            for (let m = 0; m < S.length; m += 1) S[m].m(z, null)
            he ||
                ((Oe = [ue(d, 'input', t[7]), ue(b, 'click', t[6])]), (he = !0))
        },
        p(p, [D]) {
            if ((D & 1 && d.value !== p[0] && ce(d, p[0]), D & 4)) {
                C = p[2]
                let m
                for (m = 0; m < C.length; m += 1) {
                    const V = je(p, C, m)
                    E[m]
                        ? E[m].p(V, D)
                        : ((E[m] = Ke(V)), E[m].c(), E[m].m(I, null))
                }
                for (; m < E.length; m += 1) E[m].d(1)
                E.length = C.length
            }
            if (
                (p[4]
                    ? O
                        ? O.p(p, D)
                        : ((O = Ze(p)), O.c(), O.m(n, Y))
                    : O && (O.d(1), (O = null)),
                D & 8)
            ) {
                W = p[3]
                let m
                for (m = 0; m < W.length; m += 1) {
                    const V = We(p, W, m)
                    S[m]
                        ? S[m].p(V, D)
                        : ((S[m] = Qe(V)), S[m].c(), S[m].m(z, null))
                }
                for (; m < S.length; m += 1) S[m].d(1)
                S.length = W.length
            }
        },
        i: xe,
        o: xe,
        d(p) {
            p && v(e), De(E, p), O && O.d(), De(S, p), (he = !1), nt(Oe)
        },
    }
}
const et = 500
function wn(t, e, n) {
    let s = '',
        r = '',
        i = [],
        a = [],
        o = !1
    const c = nn(bn, ln({ baseUrl: 'https://demo.connect.build' })),
        u = async () => {
            const g = await c.say({ sentence: r })
            n(3, (a = [...a, g.sentence]))
        },
        h = async () => {
            const g = new mt({ name: s })
            let b = []
            for await (const y of c.introduce(g)) b.push(y.sentence)
            setTimeout(() => {
                n(4, (o = !0))
            }, b.length * et)
            for (var w = 0; w < b.length; w++)
                ((y) => {
                    setTimeout(() => {
                        n(2, (i = [...i, b[y]]))
                    }, et * (y + 1))
                })(w)
        }
    function l() {
        ;(s = this.value), n(0, s)
    }
    function d() {
        ;(r = this.value), n(1, r)
    }
    return [s, r, i, a, o, u, h, l, d]
}
class Nn extends gt {
    constructor(e) {
        super(), pt(this, e, wn, yn, bt, {})
    }
}
export { Nn as default }
