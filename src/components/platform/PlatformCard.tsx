import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Row, Col, Button } from "react-bootstrap";
import {
  MapPin,
  DollarSign,
  Shield,
  Server,
  Globe,
  ExternalLink,
  Clock,
  Building,
  Zap,
  Network,
  HardDrive,
  Eye,
} from "lucide-react";
import type { PlatformInformation } from "../../model/platform";

interface PlatformCardProps {
  platform: PlatformInformation;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const primaryRegion = platform.regions[0];

  // Fix the minPrice calculation with proper null checks
  const minPrice =
    platform.computeInstances && platform.computeInstances.length > 0
      ? Math.min(
          ...platform.computeInstances
            .flatMap((instance) => instance.pricingModels || [])
            .filter((pricing) => pricing.pricePerHour)
            .map((pricing) => pricing.pricePerHour!)
        )
      : null;

  const getPlatformTypeVariant = (type: string) => {
    switch (type) {
      case "Hyperscaler":
        return "primary";
      case "GPU Cloud":
        return "success";
      case "Edge Cloud":
        return "info";
      case "Specialized AI":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <Card.Header className="bg-light border-0 pb-2">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-1 text-dark fw-bold">
              {platform.platformName}
            </Card.Title>
            <Badge
              bg={getPlatformTypeVariant(platform.platformType)}
              className="me-2"
            >
              {platform.platformType}
            </Badge>
            {platform.parentCompany && (
              <div className="text-muted small mt-1">
                <Building size={14} className="me-1" />
                {platform.parentCompany}
              </div>
            )}
          </div>
        </div>
      </Card.Header>

      <Card.Body className="pt-3">
        {/* Key Metrics Row */}
        <Row className="mb-3">
          <Col xs={6} className="border-end">
            <div className="text-center">
              <MapPin size={16} className="text-primary mb-1" />
              <div className="fw-semibold text-primary">
                {platform.regions.length}
              </div>
              <small className="text-muted">Regions</small>
              {primaryRegion && (
                <div className="small text-muted mt-1">
                  Primary: {primaryRegion.regionName}
                </div>
              )}
            </div>
          </Col>
          <Col xs={6}>
            <div className="text-center">
              <Server size={16} className="text-success mb-1" />
              <div className="fw-semibold text-success">
                {platform.computeInstances?.length || 0}
              </div>
              <small className="text-muted">Instance Types</small>
            </div>
          </Col>
        </Row>

        {/* Pricing and SLA */}
        {(minPrice !== null && !isNaN(minPrice)) || platform.slaUptime ? (
          <Row className="mb-3">
            {minPrice !== null && !isNaN(minPrice) && (
              <Col xs={6} className={platform.slaUptime ? "border-end" : ""}>
                <div className="text-center">
                  <DollarSign size={16} className="text-warning mb-1" />
                  <div className="fw-semibold text-warning">
                    ${minPrice.toFixed(2)}
                  </div>
                  <small className="text-muted">Starting /hr</small>
                </div>
              </Col>
            )}
            {platform.slaUptime && (
              <Col xs={minPrice !== null && !isNaN(minPrice) ? 6 : 12}>
                <div className="text-center">
                  <Shield size={16} className="text-info mb-1" />
                  <div className="fw-semibold text-info">
                    {platform.slaUptime}%
                  </div>
                  <small className="text-muted">SLA Uptime</small>
                </div>
              </Col>
            )}
          </Row>
        ) : null}

        {/* Features Badges */}
        <div className="mb-3">
          {platform.bareMetalAvailable && (
            <Badge bg="dark" className="me-2 mb-1">
              <HardDrive size={12} className="me-1" />
              Bare Metal
            </Badge>
          )}
          {platform.networking.vpcSupport && (
            <Badge bg="primary" className="me-2 mb-1">
              <Network size={12} className="me-1" />
              VPC
            </Badge>
          )}
          {platform.securityFeatures?.encryptionAtRest && (
            <Badge bg="success" className="me-2 mb-1">
              <Shield size={12} className="me-1" />
              Encrypted
            </Badge>
          )}
          {platform.edgeLocations && platform.edgeLocations > 0 && (
            <Badge bg="info" className="me-2 mb-1">
              <Zap size={12} className="me-1" />
              Edge ({platform.edgeLocations})
            </Badge>
          )}
        </div>
      </Card.Body>

      <Card.Footer className="bg-white border-0 pt-0">
        <Row className="g-2">
          <Col>
            <Link
              to={`/platform/${encodeURIComponent(platform.platformName)}`}
              className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center text-decoration-none"
            >
              <Eye size={14} className="me-1" />
              View Details
            </Link>
          </Col>
          <Col>
            <Button
              href={platform.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-secondary"
              size="sm"
              className="w-100"
            >
              <Globe size={14} className="me-1" />
              Website
              <ExternalLink size={12} className="ms-1" />
            </Button>
          </Col>
        </Row>
        <div className="text-center mt-2">
          <small className="text-muted">
            <Clock size={12} className="me-1" />
            Updated: {new Date(platform.lastUpdated).toLocaleDateString()}
          </small>
        </div>
      </Card.Footer>
    </Card>
  );
};
