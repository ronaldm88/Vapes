class PagesController < ApplicationController
  def index
    if user_signed_in?

      render :'beers/index'
    else
      @user = User.new
      render :index
    end
  end
end
