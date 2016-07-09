# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.destroy_all
Beer.destroy_all
CheckIn.destroy_all

zac = User.create(username: "zacsdrinkingclub", first_name: "Zac", last_name: "Baston", email:"zbaston1@gmail.com", password: "password")
u1 = User.create(username: "Test One", first_name: "Test", last_name: "One", email:"test@gmail.com", password: "password")
zu2 = User.create(username: "Test Two", first_name: "Test", last_name: "two", email:"test2@gmail.com", password: "password")

mangrove = Beer.create(name:"MANGrOve Pale Ale", brewery:"Oyster City Brewing Company",style:"Pale Ale")
homefront = Beer.create(name:"Homefront IPA", brewery:"Cigar City Brewing", style:"IPA")
saison_z = Beer.create(name:"Saison Z", brewery:"Jolly Pumpkin Artisan Ales", style:"Saison")
first_light = Beer.create(name:"First Light of Day", brewery:"Oyster City Brewing Company",style:"Golden Ale")
stone_crab = Beer.create(name:"Stone Crab IPA", brewery:"Belfast Bay Brewing Co.", style:"IPA")
destiny = Beer.create(name:"Destiny", brewery:"Moonlight Meadery", style:"Cider")
kbs = Beer.create(name:"Kentucky Breakfast Stout", brewery:"Founders Brewing", style:"Imperial Stout")

zac.check_ins.build(beer:kbs, rating:10, comment:"Amazing beer!")
zac.check_ins.build(beer:homefront, rating:8, comment:"Floral hops")
u1.check_ins.build(beer:saison_z, rating:7, comment:"Belgian yeast")

zac.save
u1.save
