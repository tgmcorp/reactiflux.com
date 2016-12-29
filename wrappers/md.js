import React from 'react'
import 'css/markdown-styles.scss'
import Helmet from 'react-helmet'
import { config } from 'config'
import { Container, MarkdownContainer, LinkList, StyledLink, Title } from '../utils/components'

module.exports = React.createClass({
  propTypes () {
    return {
      router: React.PropTypes.object,
    }
  },
  render () {
    const post = this.props.route.page.data
    const isTranscripts = this.props.route.path.indexOf('/transcripts/') != -1
    const basis = isTranscripts ? '70%' : '100%';

    const articles = this.props.route.pages.filter((route) => {
        if(route.path !== '/transcripts/' && route.path.indexOf('/transcripts/') != -1)
          return route;
    });

    const items = articles.map((article) => {
      return <li><StyledLink to={article.path} title={article.data.title}>{article.data.title}</StyledLink></li>
    });

    return (
      <Container>
        <Helmet
          title={`${config.siteTitle} | ${post.title}`}
        />
        <Title secondary>{post.title}</Title>
        {isTranscripts && <LinkList>{items}</LinkList>}
        <MarkdownContainer className="markdown" style={{flexBasis: basis}} dangerouslySetInnerHTML={{ __html: post.body }} />
      </Container>
    )
  },
})
