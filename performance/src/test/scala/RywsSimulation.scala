import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class RywsSimulation extends Simulation {

  val splitPosition = sys.env("BASE_URL").lastIndexOf("/")
  val baseUrl = sys.env("BASE_URL").substring(0, splitPosition)
  val appPath = sys.env("BASE_URL").substring(splitPosition)
  val users = sys.env("USERS").toInt
  val time = sys.env("RAMP_UP_TIME").toInt

  val httpProtocol = http
    .baseURL(baseUrl)
    .inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.(t|o)tf""", """.*\.png"""), WhiteList())
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-GB,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:43.0) Gecko/20100101 Firefox/43.0")

  val postHeaders = Map("Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")

  val refIdFeeder = Iterator.continually(Map("refId" -> java.util.UUID.randomUUID.toString))

  val scn = scenario("RywsSimulation")
    .feed(refIdFeeder)
    .exec(http("dashboard")
      .get(s"$appPath/$${refId}"))
    .pause(2)
    .exec(http("add job view")
      .get(s"$appPath/$${refId}/jobs/new"))
    .pause(2)
    .exec(http("save new job")
      .post(s"$appPath/$${refId}/jobs/new")
      .headers(postHeaders)
      .formParam("title", "Job Title")
      .formParam("employer", "employer name")
      .formParam("sourceType", "online")
      .formParam("sourceUrl", "http://abc.de")
      .formParam("deadline", "20/10/2016")
      .formParam("rating", "2"))
    .pause(2)
    .exec(http("add second job view")
      .get(s"$appPath/$${refId}/jobs/new"))
    .pause(2)
    .exec(http("save second job")
      .post(s"$appPath/$${refId}/jobs/new")
      .headers(postHeaders)
      .formParam("title", "Some other job")
      .formParam("employer", "employer name")
      .formParam("sourceType", "online")
      .formParam("sourceUrl", "http://abc.de")
      .formParam("deadline", "20/10/2016")
      .formParam("rating", "3"))
    .pause(2)
    .exec(http("visit dasbhoard")
      .get(s"$appPath/$${refId}")
      .check(css("ul > a:nth-of-type(1)", "name").saveAs("firstJobId"))
      .check(css("ul > a:nth-of-type(2)", "name").saveAs("secondJobId")))
    .pause(2)
    .exec(http("update status")
      .post(s"$appPath/$${refId}/jobs/$${firstJobId}?_method=PATCH&sort=created&filter=all")
      .headers(postHeaders)
      .formParam("status", "interview"))
    .pause(2)
    .exec(http("delete second job")
      .post(s"$appPath/$${refId}/jobs/$${secondJobId}?_method=DELETE")
      .headers(postHeaders))


  setUp(scn.inject(rampUsers(users) over (time seconds))).protocols(httpProtocol)
}
