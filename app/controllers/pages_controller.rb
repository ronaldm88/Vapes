class PagesController < ApplicationController
  def index
    if user_signed_in?

      redirect_to check_ins_path
    else
      @user = User.new
      render :index
    end
  end

  def feed

  end

  def about

  end

  def contact

  end
end
