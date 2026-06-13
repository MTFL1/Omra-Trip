import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function useLanguage() {
  const { i18n, t } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return { language: i18n.language, changeLanguage, t, isRTL: i18n.language === 'ar' }
}
