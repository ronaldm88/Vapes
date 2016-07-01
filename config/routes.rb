Rails.application.routes.draw do
  resources :beers
  root 'pages#index'
  devise_for :users
  resources :users

end
