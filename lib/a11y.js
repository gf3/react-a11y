'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _after = require('./after');

var _after2 = _interopRequireDefault(_after);

var _options2 = require('./options');

var _options3 = _interopRequireDefault(_options2);

var _browser = require('./util/browser');

var _browser2 = _interopRequireDefault(_browser);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A11y = function () {

  /**
   * @arg {object} React    - The React instance you want to patch
   * @arg {object} ReactDOM - The ReactDOM instance you'll be using
   * @arg {object} options  - the options
   * @returns {A11y} The react-a11y instance
   */

  function A11y() {
    (0, _classCallCheck3.default)(this, A11y);

    var _validate = _options3.default.apply(undefined, arguments);

    var React = _validate.React;
    var ReactDOM = _validate.ReactDOM;
    var options = (0, _objectWithoutProperties3.default)(_validate, ['React', 'ReactDOM']);


    this.options = options;
    this.React = React;
    this.ReactDOM = ReactDOM;
    this.suite = new _test2.default(React, ReactDOM, this.options);
    this.patchReact();
  }

  /**
   * Patch React, replacing its createElement by our implementation
   * so we can run the tests
   * @returns {undefined}
   */


  (0, _createClass3.default)(A11y, [{
    key: 'patchReact',
    value: function patchReact() {

      // save old createElement
      this._createElement = this.React.createElement;

      var that = this;
      this.React.createElement = function (klass) {
        var _props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // fix for props = null
        var props = _props || {};

        // create a refs object to hold the ref.
        // this needs to be an object so that it can be passed
        // by reference, and hold chaning state.
        var refs = typeof props.ref === 'string' ? props.ref : {};
        var ref = typeof props.ref === 'string' ? props.ref : function (node) {
          refs.node = node;

          // maintain behaviour when ref prop was already set
          if (typeof props.ref === 'function') {
            props.ref(node);
          }
        };

        var newProps = typeof klass === 'string' ? (0, _extends3.default)({}, props, { ref: ref }) : props;

        for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          children[_key - 2] = arguments[_key];
        }

        var reactEl = that._createElement.apply(that, [klass, newProps].concat(children));

        // only test html elements
        if (typeof klass === 'string') {

          var handler = that.failureHandler(reactEl, refs);
          var childrenForTest = children.length === 0 ? props.children || [] : children;

          that.suite.test(klass, props, childrenForTest, handler);
        }

        return reactEl;
      };
    }

    /**
     * Restore React and all components as if we were never here
     * @returns {undefined}
     */

  }, {
    key: 'restoreAll',
    value: function restoreAll() {
      this.React.createElement = this._createElement;
      _after2.default.restorePatchedMethods();
    }

    /**
     * Creates a failure handler based on the element that was created
     * @arg {object} reactEl - The react element this failure is for
     * @arg {object} ref     - The object that holds the DOM node (passed by ref)
     * @returns {function} A handler that knows everything it needs to know
     */

  }, {
    key: 'failureHandler',
    value: function failureHandler(reactEl, ref) {
      var _options = this.options;
      var reporter = _options.reporter;
      var filterFn = _options.filterFn;

      /**
       * @arg {string} errInfo  - All the error info (see docs what this means)
       * @returns {undefined}
       */

      return function (errInfo) {
        var _this = this;

        // get the owning component (the one that has
        // the element in its render fn)
        var owner = reactEl._owner;

        // if there is an owner, use its name
        // if not, use the tagname of the violating elemnent
        var displayName = owner && owner.getName();

        // stop if we're not allowed to proceed
        if (!filterFn(displayName, errInfo.props.id, errInfo.msg)) {
          return;
        }

        // gather all info for the reporter
        var info = (0, _extends3.default)({}, errInfo, { displayName: displayName
        });

        // if we need to include the rendered node, we need to wait until
        // the owner has rendered
        // TODO: reduce the number of case where ther is no instance
        // by forcing every component to have one.
        if (_browser2.default && !this.__sync && owner && owner._instance) {
          (function () {
            var instance = owner._instance;
            // Cannot log a node reference until the component is in the DOM,
            // so defer the call until componentDidMount or componentDidUpdate.
            _after2.default.render(instance, function () {
              // unpack the ref
              var DOMNode = false;
              if (typeof ref === 'string') {
                DOMNode = this.ReactDOM.findDOMNode(instance.refs[ref]);
              } else if ('node' in ref) {
                DOMNode = ref.node;
              } else {
                throw new Error('could not resolve ref');
              }

              reporter((0, _extends3.default)({}, info, { DOMNode: DOMNode }));
            }.bind(_this));
          })();
        } else {
          reporter(info);
        }
      }.bind(this);
    }
  }]);
  return A11y;
}();

exports.default = A11y;