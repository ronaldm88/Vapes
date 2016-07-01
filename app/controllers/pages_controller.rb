class PagesController < ApplicationController
  def index
    if user_signed_in?

      redirect_to beers_path
    else
      @user = User.new
      render :index
    end
  end
end
