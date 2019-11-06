Rails.application.routes.draw do
  devise_for :users
  root to: "home#index"

  get 'tasks/:type' => "tasks#index"
  resources :tasks do
    member do
      get :remove
    end
    collection do 
      get :to_me
      get :from_me
    end
  end

end
