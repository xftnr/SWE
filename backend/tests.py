import unittest
import json
import requests

url = "https://www.energenius.me/api/"

class TestBeckendAPIMethods(unittest.TestCase):

    def test_API_Page_1(self):
        r = requests.get(url + "add/energy")
        self.assertEqual(r.status_code, 200)

    def test_API_Page_2(self):
        r = requests.get(url + "add/country")
        self.assertEqual(r.status_code, 200)

    def test_API_Page_3(self):
        r = requests.get(url + "add/production")
        self.assertEqual(r.status_code, 200)

    def test_Page_Not_Found_1(self):
        r = requests.get(url)
        self.assertEqual(r.status_code, 404)

    def test_Page_Not_Found_2(self):
        r = requests.get(url + "usage/")
        self.assertEqual(r.status_code, 404)

    def test_Page_Not_Found_3(self):
        r = requests.get(url + "energy/")
        self.assertEqual(r.status_code, 404)

    def test_API_all(self):
        r = requests.get(url + "energy?name=all")
        d = json.loads(r.text)
        self.assertEqual(len(d), 27)

    def test_API_list(self):
        r = requests.get(url + "energy?name=list")
        d = json.loads(r.text)
        self.assertEqual(len(d[0]), 1)

    def test_API_name_match_API(self):
        r = requests.get(url + "energy?name=Biomass")
        d = json.loads(r.text)
        self.assertEqual(d[0]["API"], "Biomass")

    def test_API_name_match_Type(self):
        r = requests.get(url + "energy?name=Biomass")
        d = json.loads(r.text)
        self.assertEqual(d[0]["Type"], "Renewable Energy")

    def test_API_name_match_Region(self):
        r = requests.get(url + "country?name=Australia")
        d = json.loads(r.text)
        self.assertEqual(d[0]["Region"], "Pacific")

    def test_API_name_match_Carbon_Emission(self):
        r = requests.get(url + "production?name=Offshore drilling")
        d = json.loads(r.text)
        self.assertEqual(d[0]["Carbon_Emission"], 2338)

    # filter test
    def test_API_filter_Energy(self):
        """
        Type = Physical Energy
        Major_Use = Industrial
        Top_Producing_Country = China
        """
        r = requests.get("https://www.energenius.me/api/filter/energy?Type=Physical%20Energy&Major_Use=Industrial&Top_Producing_Country=China")
        d = json.loads(r.text)
        self.assertEqual(len(d), 1)

    def test_API_filter_Country(self):
        """
        Type = all
        Year_of_Invention = BC or 1900-2000
        Usage_Field = Residential
        """
        r = requests.get("https://www.energenius.me/api/filter/production?Type=all&Year_of_Invention=BC|1900-2000&Usage_Field=Residential")
        d = json.loads(r.text)
        self.assertEqual(len(d), 4)
        self.assertEqual(d[2]["Usage_Field"], "Residential")

        def test_API_filter_Country(self):
            """
            Region = Africa
            Population = all
            Total_Production = >2000
            """
            r = requests.get("https://www.energenius.me/api/filter/country?Region=Africa&Population=all&Total_Production=%3E2000")
            d = json.loads(r.text)
            self.assertEqual(len(d), 1)
            self.assertEqual(d[0]["Name"], "Wakanda")


if __name__ == '__main__':
    unittest.main()
