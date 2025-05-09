import { defineQuery } from 'next-sanity'

export const BLOGS_QUERY =
	defineQuery(`*[_type == "blog" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`)

export const BLOG_BY_ID_QUERY =
	defineQuery(`*[_type == "blog" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  article,
}`)

export const BLOG_BY_SLUG_QUERY =
	defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  article,
}`)
