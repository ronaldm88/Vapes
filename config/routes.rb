Rails.application.routes.draw do
  root 'pages#index'
  devise_for :users
  resources :check_ins, only: [:index]
  resources :beers

  resources :users do
    resources :check_ins
  end

  get 'about' => 'pages#about'
  get 'contact' => 'pages#contact'
end
