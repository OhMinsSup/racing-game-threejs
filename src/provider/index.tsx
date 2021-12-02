import React from 'react'
import { RecoilRoot } from 'recoil'

const AppProvider: React.FC = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default AppProvider
