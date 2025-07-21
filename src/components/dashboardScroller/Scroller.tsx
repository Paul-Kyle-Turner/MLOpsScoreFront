import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlatformCard } from "../platform/PlatformCard";
import { paginatePlatforms } from "../../api/platform";
import type { PlatformInformation } from "../../model/platform";

interface ScrollerProps {
  title?: string;
  pageSize?: number;
}

export const Scroller: React.FC<ScrollerProps> = ({
  title = "Featured MLOps Platforms",
  pageSize = 6,
}) => {
  const [platforms, setPlatforms] = useState<PlatformInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Load platforms
  useEffect(() => {
    const loadPlatforms = async () => {
      try {
        setLoading(true);
        const data = await paginatePlatforms(currentPage, pageSize);
        setPlatforms(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load platforms"
        );
      } finally {
        setLoading(false);
      }
    };

    loadPlatforms();
  }, [currentPage, pageSize]);

  // Update scroll buttons visibility
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons(); // Initial check

      return () => {
        scrollContainer.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, [platforms]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      const scrollAmount = Math.min(
        cardWidth * 2,
        scrollContainerRef.current.clientWidth * 0.8
      );
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      const scrollAmount = Math.min(
        cardWidth * 2,
        scrollContainerRef.current.clientWidth * 0.8
      );
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const loadMorePlatforms = async () => {
    try {
      const nextPageData = await paginatePlatforms(currentPage + 1, pageSize);
      if (nextPageData.length > 0) {
        setPlatforms((prev) => [...prev, ...nextPageData]);
        setCurrentPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Failed to load more platforms:", err);
    }
  };

  if (loading && platforms.length === 0) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading platforms...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  if (error && platforms.length === 0) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4">
      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">{title}</h3>
            <div className="d-flex gap-2 scroller-controls">
              <button
                className={`btn btn-outline-secondary btn-sm ${
                  !canScrollLeft ? "disabled" : ""
                }`}
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className={`btn btn-outline-secondary btn-sm ${
                  !canScrollRight ? "disabled" : ""
                }`}
                onClick={scrollRight}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div
            ref={scrollContainerRef}
            className="d-flex gap-3 overflow-auto pb-3"
            style={{
              scrollBehavior: "smooth",
              WebkitScrollSnapType: "x mandatory",
              scrollSnapType: "x mandatory",
              msOverflowStyle: "none", // Hide scrollbar in IE
              scrollbarWidth: "none", // Hide scrollbar in Firefox
            }}
          >
            {platforms.map((platform, index) => (
              <div
                key={`${platform.id || platform.platformName}-${index}`}
                className="flex-shrink-0"
                style={{
                  scrollSnapAlign: "start",
                  scrollSnapStop: "always",
                }}
              >
                <PlatformCard platform={platform} />
              </div>
            ))}

            {/* Load more button if there might be more data */}
            {platforms.length >= pageSize && (
              <div
                className="flex-shrink-0 d-flex align-items-center justify-content-center"
                style={{ minWidth: "200px" }}
              >
                <button
                  className="btn btn-outline-primary"
                  onClick={loadMorePlatforms}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Custom CSS for better scrollbar styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .overflow-auto::-webkit-scrollbar {
            height: 8px;
          }
          
          .overflow-auto::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          
          .overflow-auto::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
          }
          
          .overflow-auto::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }

          /* Show scrollbar on mobile for better UX */
          @media (max-width: 768px) {
            .scroller-controls {
              display: none !important;
            }
            
            .overflow-auto {
              scrollbar-width: thin !important;
              -ms-overflow-style: auto !important;
            }
            
            .overflow-auto::-webkit-scrollbar {
              height: 6px !important;
            }
          }

          /* Hover effect for platform cards in scroller */
          .flex-shrink-0:hover {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
          }
        `,
        }}
      />
    </Container>
  );
};

export default Scroller;
