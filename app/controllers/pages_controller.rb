class PagesController < ApplicationController
  def index
    if user_signed_in?

      redirect_to :feed
    else
      @user = User.new
      render :index
    end
  end

  def feed
    @check_ins = CheckIn.last(10)

    respond_to do |f|
      f.html { render :feed }
      f.json { render json: @check_ins, status: 201 }
    end
  end

  def about

  end

  def contact

  end
end
