import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Get list of all available countries' })
  @ApiResponse({ status: 200, description: 'List of countries retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to fetch countries.' })
  @Get()
  async getCountries() {
    return this.countriesService.getCountries();
  }

  @ApiOperation({ summary: 'Get detailed information about a specific country' })
  @ApiResponse({ status: 200, description: 'Country details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @ApiResponse({ status: 500, description: 'Failed to fetch country details.' })
  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    try {
      const countryDetails = await this.countriesService.getCountryDetails(countryCode);
      return countryDetails;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          message: error.message || 'Failed to fetch country information',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
