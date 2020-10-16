import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom'
import ApiErrorBoundary from './ErrorBoundaries/ApiErrorBoundary/ApiErrorBoundary';
import 'typeface-roboto'
import './index.css'
import App from './App/App'

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

const errorMessage = `It looks like there's an issue connecting to the server. Please try again later.`

ReactDOM.render(
  <BrowserRouter>
	<ApiErrorBoundary message={ errorMessage }>
			<App />
	</ApiErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root')
)
