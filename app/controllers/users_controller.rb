class UsersController < ApplicationController
  def show
    if user_signed_in?
      session[:session_id].clear
    end

    redirect_to root_path
  end
end
