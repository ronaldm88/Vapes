class PagesController < ApplicationController
  def index
    if user_signed_in?

      redirect_to feed_path
    else
      @user = User.new
      render :index
    end
  end

  def feed
    @check_ins = CheckIn.last(10)
  end

  def about

  end

  def contact

  end
end
