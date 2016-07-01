class BeersController < ApplicationController
  def index
    unless user_signed_in?
      @user = User.new
    end

    @beers = Beer.all
  end
end
