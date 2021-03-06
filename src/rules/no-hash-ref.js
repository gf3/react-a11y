
export default [{
  tagName: 'a'
, msg: 'Links must not point to `#`. '
     + 'Use a more descriptive href or use a button instead.'
, url: 'http://webaim.org/techniques/hypertext/'
, test (tagName, props) {
    const hashRef = props.href && props.href === '#'
    return !hashRef
  }
}]

export const pass = [{
  when: 'the `href` is not `#`'
, render: React => <a href='foo#bar' />
}]

export const fail = [{
  when: 'the `href` is `#`'
, render: React => <a href='#' />
}]

export const description = `
Enforce an anchor element's href prop value is not just \`"#"\`. You should use
something more descriptive, or use a button instead.
`
