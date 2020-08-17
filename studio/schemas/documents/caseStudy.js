import { format } from 'date-fns'

export default {
  name: 'caseStudy',
  type: 'document',
  title: 'Case Studies',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing'
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image'
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category'
          }
        }
      ]
    },
    {
      name: 'caseStudyClient',
      type: 'reference',
      title: 'Client',
      description: 'Who was the client',
      to: [
        {
          type: 'client'
        }
      ]
    },
    {
      name: 'problemSummary',
      type: 'string',
      title: 'The Problem Summary',
      description: 'Summarise the problem in one sentence'
    },
    {
      name: 'problemDetail',
      title: 'The Problem Detail',
      description: 'Expandy on the problem',
      type: 'bodyPortableText'
    },
    {
      name: 'answerSummary',
      type: 'string',
      title: 'The Answer Summary',
      description: 'Summarise the answer in a sentence'
    },
    {
      name: 'answerDetail',
      title: 'The Answer Detail',
      description: 'Expand on the answer',
      type: 'bodyPortableText'
    },
    {
      name: 'impactSummary',
      type: 'string',
      title: 'The Impact Summary',
      description: 'Summarise the impact in a sentence '
    },
    {
      name: 'impactDetail',
      title: 'The Impact Detail',
      description: 'Expand on the Impact',
      type: 'bodyPortableText'
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare({ title = 'No title', publishedAt, slug, media }) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
