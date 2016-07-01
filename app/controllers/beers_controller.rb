class BeersController < ApplicationController
  before_action :authenticate_user!

  def new
    @beer = Beer.new
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
