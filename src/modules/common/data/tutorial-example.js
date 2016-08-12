export default {
  pages: [
    {
      title: 'Welcome!',
      image: require('../../../images/tutorial/tutorial-test-1.jpg'),
      text: 'This is an example Tutorial Screen. A tutorial package consists of pages[], and each page has an optional title, an optional image, and either text or HTML content.',
    },
    {
      image: require('../../../images/tutorial/tutorial-test-2.jpg'),
      text: 'You can have multilines of text, too.\n' +
            'the Tutorial Dialog has *rudimentary* formatting features.',
    },
    {
      image: require('../../../images/tutorial/tutorial-test-3.jpg'),
      html: 'For more complicated instructions, you can also set <code>html</code> content. ' +
            'For example, perhaps you want <a href="https://google.com">external links!</a>',
    },
  ]
}
