Rails.application.routes.draw do
 root :to => "static_pages#home"
 
 resources :users
 resource :session
 get '/home' => 'static_pages#home'
 post '/search' => 'site#search'
end
