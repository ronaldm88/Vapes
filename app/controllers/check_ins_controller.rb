class CheckInsController < ApplicationController
  def index
    @check_ins = CheckIn.all
  end

  def new
    @check_in = CheckIn.new
  end

  def create
    
  end

  def show

  end

  def edit

  end

  def update

  end


end
