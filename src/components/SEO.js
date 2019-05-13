import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { metadata } from '../../site-config';

function SEO({
  description, meta, lang, keywords, title, image
}) {
  const metaDescription = description;
  const shouldHaveImage = image
    ? [
      { property: 'og:image', content: image },
      { property: 'twitter:image', content: image }
    ]
    : [];
  return (
    <Helmet
      htmlAttributes={{
        lang,
        dir: 'ltr'
      }}
      title={title}
      meta={[
        ...shouldHaveImage,
        {
          name: 'description',
          content: metaDescription
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:creator',
          content: metadata.author
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        },
        {
          name: 'og:site_name',
          content: metadata.title
        }
      ]
        .concat(
          keywords.length > 0
            ? {
              name: 'keywords',
              content: keywords.join(', ')
            }
            : []
        )
        .concat(meta)}
    />
  );
}

SEO.defaultProps = {
  description: metadata.description || 'Add site description',
  lang: 'es-MX',
  meta: [],
  keywords: [],
  image: null
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.string),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default SEO;
