import { createContext } from 'react'
import { doctors } from '../assets/assets'

const AppContext = createContext()

const AppContextProvider = (props) => {
  
  // تعريف رمز العملة لاستخدامه في كامل التطبيق
  const currencySymbol = '$'

  // الكائن الذي يحتوي على جميع البيانات المراد مشاركتها مع باقي المكونات
  const value = {
    doctors,
    currencySymbol
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
export { AppContext }