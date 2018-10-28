 /*
 * Copyright [2018] [mapulse.io (Mapulse)]
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

{
    var data = options.data;
    var store = {};
    Array.prototype.unroll = function (x) {
        for (var i = 0; i < this.length; i++) {
            this[i] = this[i][x];
        }
    }
    function _isFunction(x) {
        return Object.prototype.toString.call(x) == '[object Function]';
    }
    function _unnest (keys) {
        return function (target) {
            var y = Object.assign({}, target);
            for (var i = 0; i < keys.length; i++) {
                y = y[keys[i]];
            }
            return y;
        }
    }
    function _map (target) {
        return function (callback) {
            return ( Array.isArray(target)
                && target.length > 0 ) ? 
                    target.map(callback)
                        : null;
        }
    }
    function _reduce (target) {
        return function (callback) {
            return ( Array.isArray(target) 
                && target.length > 1 ) ? 
                    target.slice(1).reduce(callback, target[0]) 
                        : target[0] || null;
        }
    }
    function _filter (target) {
        return function (callback) {
            return ( Array.isArray(target) 
                && target.length > 1 ) ? 
                    target.filter(callback) 
                        : null;
        }
    }
    /*
    Note when used with _reduce it will take the
    first arg and simply round it by the second.
    */
    function _round (x, y) {
        return Number(x).toFixed(y);
    }
    function _eval (x, y) {
        if (x.length === 0) {
            return x();
        } else {
            if (Array.isArray(y) &&
                y.length > 0 &&
                y.every(cv => cv !== undefined)) {
                var z = x(y[0]);
                if (y.length > 1) {
                    if (y.every(cv => !isNaN(cv))) {
                        z = _reduce(y)(x);
                    } else {
                        y.slice(1).forEach(cv => {
                            z = _isFunction(z)? z(cv): z;
                        });
                    }
                }
                console.log('eval', z);
                return z;
            } else {
                console.log('no eval, returning fn', x);
                return x;
            }
        }
    }
}

start = _ src _ (assign)* _ x:end _ {
    return x;
}

end = _ "return" ws rhs:val {
    return rhs[1];
}

assign = _ lhs:name _ eq _ rhs:val _ {
    store[lhs] = rhs[1];
}

val = _ (arg / fn / curry) _ 

arg = _ op _ x:fn _ y:val* _ cl _ {
    y.unroll(1);
    console.log('fn', x);
    console.log('val', y);
    return _eval(x, y)
}

fn = arraymethods
    / binaryoperator 
    / unnest 
    / round
    / num
    / get

curry = _ a:fn _ "$" _ b:fn _ {
    return b(a);
}

arraymethods = map / reduce / filter / filtercallbacks

    map = _ "map" ws {
        return _map;
    }
    
    reduce = _ "reduce" ws {
        return _reduce;
    }

    filter = "filter" ws {
        return _filter;
    }

        filtercallbacks = gt / lt / e
        
            gt = _ "gt" ws n:num _ {
                return function (cv) {return Number(cv) > Number(n);}
            }
            
            lt = _ "lt" ws n:num _ {
                return function (cv) {return Number(cv) < Number(n);}
            }
        
            e = _ "eq" ws n:num _ {
                return function (cv) {return Number(cv) == Number(n);}
            }

binaryoperator = add / multiply / subtract / divide

    add = _"+"_ {
        return function (a, b) {
            return a + b;
        };
    }
    
    subtract = _"-"_ {
        return function (a, b) {
            return a - b;
        }
    }

    multiply = _"*"_ {
        return function (a, b) {
            return a * b;
        };   
    }

    divide = _"%"_ {
        return function (a, b) {
            return a / b;
        }
    }

unnest = _ keys:key+ _ {
    keys.unroll(3);
    return _unnest(keys);
}

src = _ "from" ws label: name {
    store[label] = data;
}

round = _ "round" ws {
    return _round;
}

num = n:[.0-9]+ {
    return Number(n.join(""));
}

key = _ "." _ name _ 

name = label:[a-zA-Z_0-9]+ {
    return label.join("");
}

get = label:name {
    return store[label];
}
            
_ = [ \t\n\r]*

ws = [ \t\n\r]+

eq = _ "=" _

op = _ "(" _

cl = _ ")" _ 

