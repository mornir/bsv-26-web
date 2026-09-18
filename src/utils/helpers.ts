// TODO: Replace with nested GROQ query
import type { GetIndexQueryResult } from '@/types/sanity.types'

export function buildToc({
  titles,
  chapters,
  sections,
  articles,
}: GetIndexQueryResult) {
  return titles.map((title) => {
    const titleChapters = chapters.filter((c) => c.titleNum === title.number)

    const titleSections = sections.filter(
      (s) => s.titleNum === title.number && !s.chapterNum
    )

    const titleArticles = articles.filter(
      (a) => a.titleNum === title.number && !a.chapterNum && !a.sectionNum
    )

    return {
      ...title,
      chapters: titleChapters.map((chapter) => {
        const chapterSections = sections.filter(
          (s) => s.titleNum === title.number && s.chapterNum === chapter.number
        )

        const chapterArticles = articles.filter(
          (a) =>
            a.titleNum === title.number &&
            a.chapterNum === chapter.number &&
            !a.sectionNum
        )

        return {
          ...chapter,
          sections: chapterSections.map((section) => {
            const sectionArticles = articles.filter(
              (a) =>
                a.titleNum === title.number &&
                a.chapterNum === chapter.number &&
                a.sectionNum === section.number
            )

            return {
              ...section,
              articles: sectionArticles,
            }
          }),
          articles: chapterArticles,
        }
      }),
      sections: titleSections.map((section) => {
        const sectionArticles = articles.filter(
          (a) =>
            a.titleNum === title.number &&
            !a.chapterNum &&
            a.sectionNum === section.number
        )

        return {
          ...section,
          articles: sectionArticles,
        }
      }),
      articles: titleArticles,
    }
  })
}
