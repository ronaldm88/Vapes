class BeersController < ApplicationController
  def new
    @beer = Beer.new
    @user = User.new
  end

  def create
    @beer = Beer.new(beer_params)

    if @beer.save
      redirect_to beer_path(@beer)
    else
      render :back
    end
  end

  def index
    unless user_signed_in?
      @user = User.new
    end

    @beers = Beer.all
  end

  def show
    @beer = Beer.find(params[:id])
  end

  private
    def beer_params
      params.require(:beer).permit(:name, :style, :brewery)
    end
end
