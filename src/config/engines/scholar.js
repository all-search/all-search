export default [
  {
    name: '谷歌学术',
    url: 'https://scholar.google.com/scholar?hl=zh-CN&q=%s',
    favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVQ4jYWT2UtUURzHL/QH1LMP9hKVNUKFWpP7TDrjU9uEo4WPWlERUbSoueSMaTWjTBCRGV3HiCsSWrTQApVSZBtZWEZSUWZkC3PPne3OzKeHK1NKy4Hfyzl8P+d3vt/fkSRJmpWSVbU9vbxbMZXJSnqZrMx3yErqmrN/r7V+Zf76jjNz5mYXSilZldtKfGBrA5sXcg7Dpg5wX/lzNV+FlmuwsRNy6r9HJFO5v9feBlaXILNWxenT+Pgtzr/W2Oc4azwalqMgLXZ29di9JMXj/xH3P4pybjDKhvYg1qMgpZfKyko3lPk0xr9PF7/4EOfTjwQAiQRcfqpjrlMZeBVjc2eI/FaQ5jlkZWs3qKHENPH7yTg5DYKKExp6DGJxcLRprHILAJr7w5hdIC1wyMquHmNj3/kQN57rALz9Eie/SZBRo/JwLAZAtRLC4jIA7r4pQHqprBS0QkaNysLdAXbKIQAiOjh9Gml7VOS7kaSooGkGwFQqKzYvWFyCgiZBbqPg3mvjRv9ABNPeANeHdSbVBOu8GvYWA9ByMcyKmQCLS5DToFLSKlDuR/kmEox+Moyt6w2TtidAUbPgyKUwZceDWI7MAFhdRgdL9quk7ghw8bGeNPXdZJzKjiCZNSpZtSp5jQKb9zeA1SUw16ms9WqcvBlhcDTG4KsYoxO/ohXhBFWng5jrVCwuQbHnN0B2vaDiRJCJqdzvvtRZfUyQ3SA4dSuCbtjC0JsY5npBYRLg9PfaPEYK14f15NA4fRpLD6jkHxKY9ga4PWKcvRyPk9toGF7sBWmR45S/pN0Y5a6BaLLdroEoGTUqy6oNc99NGk85dCHM8oMCqzuIvQ2k2XPzLAWNX9UiD9i90D0EE8Yo8GQc/A/g2QSMfIHaPsg9DMUe4/dmbrnz8CdxKwtDTtdexQAAAABJRU5ErkJggg=='
  },
  {
    name: '百度学术',
    url: 'http://xueshu.baidu.com/s?wd=%s',
    favicon: icon.baidu
  },
  {
    name: '知网',
    url: 'http://epub.cnki.net/kns/brief/default_result.aspx?txt_1_value1=%s&dbPrefix=SCDB&db_opt=CJFQ%2CCJFN%2CCDFD%2CCMFD%2CCPFD%2CIPFD%2CCCND%2CCCJD%2CHBRD&singleDB=SCDB&action=scdbsearch',
    favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB3klEQVQ4jaXSMUhqURzH8YuBrSbiIIKIS4vo4ORQgyJCBg5Fuuqgsyh3tKFwUsjFycEIwq0lBMc7RLQFIl4RnLxXzqbe4Yp0v28I6vle+F70h99y4Hw45///S9SO+Ukkasf8XovFgkKhgCzLrFYrdtZXgBCCw8NDbDYbnU7n+4Cu67hcLlKpFEKI7wOPj4/Y7Xaen595eXmhUqmg6/r/AUIIQqEQBwcH5PN5HA4HTqcTVVW37mma9t6fP4GrqyskSfqIx+Oh1+sBsNlseHp6olwuE4lEuLy8/BsYj8fc3NwQCATw+/0Mh0NM0+Tu7o5Go0GhUKBerxMOh4nFYl/3wDAMms0mPp+P+/t7ptMpXq+XYrGIaZqs12vOzs5QFGUbGAwG9Pt9FEUhm80iSRJHR0dMJhNOTk6oVCoAtNttzs/P2Ww2n4CmabjdbhwOB7FYDL/fjyzLCCGwLItSqUQwGKRarbK3t0c6nWa5XH4Cs9mM09NTcrkco9GIWq3G7e0tlmUBMJ1OiUajxONxWq0Wqqry9va2/YXFYvExynQ6zfX1NZlMhvF4/HFuGMbuPdA0jWQySbVaRdd19vf3ubi4YL1e/3uRXl9fyefzJBIJ5vM5AN1ul4eHh/fn7gR+kF/ZQQ/WnEhepgAAAABJRU5ErkJggg=='
  },
  {
    name: '万方',
    url: 'http://s.g.wanfangdata.com.cn/Paper.aspx?q=%s',
    favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJ0lEQVQ4jdWSvY4BURhAPwoS8TuTqESC3lN4DZGYVqGTaPQa4g1UYjqxdN5EoURI/CQ0M9/ZYnYya9fsRrHFFqe5Jzm5936ftEXatog9EZm+ii1iy1xkQbUKlgXNpodlQb0O8TjUao/O940GJJPIRGRKr4fCd0wTXa2eO4BK5SPQ6XiHqh6Ans+oYaCz2aPz/e0GpdJfBk4nL7BcPn+C60K5/MsNTBMdj9HDAd1uA3Y7dLOBYvGHwPWKFgqoSCiI/BC4XNB8HrUsdDRCB4OA4RDt98EwwgOcz2guFzpG/sEYXwp0uziuq59x73d1DEOdxUK/Osd11XUcDfag1UKPx2DO+z2s194nhuwB/h7MRd6IxSCbhXTaI5OBVAoiEUgkHp1PKgXRKO8NfBp7UCxd2QAAAABJRU5ErkJggg=='
  },
  {
    name: 'EBSCO',
    url: 'http://web.b.ebscohost.com/ehost/results?sid=8e76c941-084d-4b93-b05a-d5f182196017%40sessionmgr102&vid=1&hid=128&bquery=%s',
    favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJ0lEQVQ4jZWT3UtTYRzHT+w4pzddeRFdBAbd1Z8giXtJz9mKvBDCxMqkrK57u6kEyx13zjHWIl8TEbMptaLpZMeMCgdBS8dSRC8WWAS9UJRS1j5d7AWnjuqB78UPHj58n+f7+wpFLp0il45Z1hBs7nVS0krPdoXM/YyEIpdOgaRSWt/JGZ9BvWeUOiXIUXWMxvZxGrQQTd4wTd4wrkv3sDh1LOsBYpVKaX0XPaEYmfPx6wqHlSAHLt/nlDdMZO4tyWSSHXUdmKrUXECxS0eUVIS9V3kYWQTAiCYQKlpT1itaESs9BKYWqHU/QrApuYDsYFMYnJwF4PH0G0RJxeLUKJQ1BKubbYdusvNIF2ZZzQOwKww9mcsCTJKKKKmU1PgoPzvElkoPBZK68RM3AxjRRMp++TWO6yFGns3nT2EzwIcvyzyILBB+mWD1128GJl7nvP2vgOjie6zn/Ow77+d5fInhp/P/BzCiCQSrG6GsBfsFP/1GHMHRhsX5j4BMCoWyxtaD19l1rBuzrGGWVYr3t+cH3Jmc2xijU8NU5UFwKFwZmGLPyb7sMmUBZllDKGvhbtrBxKv0ItmVlMpaqG4O8O7TN7bX3kKU1gDMskZJjY/G9nG+r/wEYPnHKg1aCMfFYaqbA6gjLwCYX/pMYdpVFmCq9LD7xG36jTg9oRgdwWm6x2L0heN0js7QOx5jcHKW3lCM0zcMxPVdyKmzdY3SFc6ptKMtJ4U/fkBXz/LD6BYAAAAASUVORK5CYII='
  },
  {
    name: 'WOS',
    url: 'http://apps.webofknowledge.com/UA_GeneralSearch.do?fieldCount=3&action=search&product=UA&search_mode=GeneralSearch&max_field_count=25&max_field_notice=Notice%3A+You+cannot+add+another+field.&input_invalid_notice=Search+Error%3A+Please+enter+a+search+term.&input_invalid_notice_limits=+%3Cbr%2F%3ENote%3A+Fields+displayed+in+scrolling+boxes+must+be+combined+with+at+least+one+other+search+field.&sa_img_alt=Select+terms+from+the+index&value(input1)=%s&value%28select1%29=TI&value%28hidInput1%29=initVoid&value%28hidShowIcon1%29=0&value%28bool_1_2%29=AND&value%28input2%29=&value%28select2%29=AU&value%28hidInput2%29=initAuthor&value%28hidShowIcon2%29=1&value%28bool_2_3%29=AND&value%28input3%29=&value%28select3%29=SO&value%28hidInput3%29=initSource&value%28hidShowIcon3%29=1&limitStatus=collapsed&expand_alt=Expand+these+settings&expand_title=Expand+these+settings&collapse_alt=Collapse+these+settings&collapse_title=Collapse+these+settings&SinceLastVisit_UTC=&SinceLastVisit_DATE=&timespanStatus=display%3A+block&timeSpanCollapsedListStatus=display%3A+none&period=Range+Selection&range=ALL&ssStatus=display%3Anone&ss_lemmatization=On&ss_query_language=&rsStatus=display%3Anone&rs_rec_per_page=10&rs_sort_by=PY.D%3BLD.D%3BVL.D%3BSO.A%3BPG.A%3BAU.A&rs_refinePanel=visibility%3Ashow',
    favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABr0lEQVQ4jZ2TPYobQRCFvyNUMpGTjgQbGAqBEZs1i5AD4VWzBoNgF1cihB0NONyk1/mgEwxzgmFuMHMD6Sa7RxgHQ8uzI+HAFRXUT79+7xVMQjPUO/zxFyfv8ONcM3Tafw4nuHZPlxZM62lBu6dzgrsYNsWKNQcA/YAW9xyKew5xSSy/UhWfh1qx5mCKvVsS74ivz7wB2CcsrogAAiIgmqGmWP+bHuD1mbd4N/RgitVbGic4zdBwQxAQm2NxSSwfqI4/OYUZwRSrv9FohtZbGlOMckPVv9ALSP1IAxA+EsYQNUPTYPs08NS/0JcbKvIFeZgRNEM1Q53gwg1hSqIpZoqVG6roiWFGyBfk9JG+j/Te4cOMkN+SX5PLO3x+OzzmHT7NnRFETyw3VKZYviC/QDAfmE9IzwgSB+P/HXecxiic4GyOAdSPNAJy5mCsQvtEFz1RM/S451RvaeKSmIZtjnmHF5CzClMftN/pTDHN0OQDgLj6u+idD5JMyYkCUj5QFevBhcUXDnE1oBKQ5MQLop3g2h1dgnlNBZtj7e7KLYwjHVP7gy5dY8r/eY3/G38A1vO4VlociLQAAAAASUVORK5CYII='
  },
  {
    name: 'JSTOR',
    url: 'http://www.jstor.org/action/doAdvancedSearch?q0=%s',
    favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADl0lEQVQ4jS2RS0zbdQCA/3cvJh71ollMICN0FhpwbBlZx+Zg0NdC3/23pbQ8B91YGQOtCAOZJQrIaillLVDgJ6+BPMTJU91Bl7mwOBQQjEuGzJMHTbx8HvD+5Uu+fFLGSy/XlipVQlaohC1NKeT0TOFSZgm3MlvYUtOF+ViKMB9LEbbUdOFWZgk5TXnEKVRCTkkTkkeRMb/cEGS+sZb1T5r54sZVRpwuhq1ONsUU+6tr7C2v8jg5TtLh5uv2Bta7mllqaWDRX49kS1OKe9eqCBvP0u+8RNynI+rIp/nEcdqyT/HX4Qv+/fsfomYnd4xq4j4NAyWFDFboSJjsSLbjSjEbqKXPdpGBEi19lgJWoteZD1XRVZTD1uoyz59uM1hup18uoM9eSMSSz0CJjmGHG0lWqETCZKfPns9Mq5fuwrOETRfpNeQRNqp5srjEwdYO4zfKGasz06vPY/ZWGZ3nThHTWpBsqQqx8tF7DFYYmGnx0u8o5MPT2UwFS2jPUbI5t8Qf27vEnBbW4wG++tSPCNiZft9DTP+/YLUzyFCFHlHvYK6jgpD6FBFrAWHTeX76coXDnT169VrmbvuYD1VyS6Uk5iwiZrAiyYpMMSK7GHAXMtHkouN0FiN+MzOtpfTocvnt4fc839ohJpu569EwVFlM3GsgYslnrNSH5M7MEuELOlpU6QyU6Ih7DWwM3iTpNxPKO8mzzR85+GWXXq2GHl0uC53VDFYW06vPY+HdAJIt9S2xGAww21bK/fA1OvNOU/vKa/Ro1ISNeWx/84DD3T367UaGqi8T9+rp1qi5/urrDFqdSI40pZj2VzHR6GC2vYzlSB3JKya+TTYx0+Zh/4eHHGztcNdtZaJJRtTZWI3VE3UUEdWYkFxKlejXGmlVKYi5tEw0ygx4tIzV2bhzWc32xgN+f/yEhM9BxPIOwzUmQuocItZ8Rj1eJGuqQiwG61kIlSMCNrouFXA7921C5zL5rDifP/ee8WhqluYTGYiAlc8bZKKOIkZqTExUVx1tvN92kz7bBbo1ZxitvcLPa+tMNtSxtbzMi1/3GaupYbLJzr0PSrljOM90sIS4V0//UUKWGHN7SZQbGKoyErUU8V0iydOVNR7dmyPhKmPEb2Ej0cjoVTsfX8il48xJxhucDFncSNY33pxfvBJg1F3GbN11kg4Pw3Y3k9V+hK+SIYsT4a1gzFNBUi5lxFXGqLuMqepaplw+/gNcwmcGmhKGRAAAAABJRU5ErkJggg=='
  },
  {
    name: 'Springer',
    url: 'http://rd.springer.com/search?query=%s',
    favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuElEQVQ4jbWRsQ2EMAxFMwjFzULHJvR0GeAaKL2GV4jEANmBiorqOipf5ejH+Dg46b5kRYLv5x8niKNl3SQSC6fs/a4UvOamG0pxyrKs231A24+H8xKg7cdi1ukKjcTngEhcjBobT72SC0ADmjA6pyxNN/gApHPKEoklElcAHYJLDRpdjXaJNrL9FjCaNnrTTwEK0RfAl7gMsCBPH3eAzfYaWN5eDgnuqgLs8ySv5+Nr7fP0J8AvegOhkGr6AYHSEgAAAABJRU5ErkJggg=='
  }
]
